const blockElements = require('block-elements');
const _ = require('lodash');
const visit = require('unist-util-visit');
const visitWithAncestors = require('unist-util-visit-parents');
const { parser } = require('posthtml-parser');
const mime = require('mime-types');
const createMediaMarkup = require('./createMediaMarkup');
const cheerio = require('cheerio');
const JSON5 = require('json5');

module.exports = ({ markdownAST }) => {
  // Add a <div class="table-container"> wrapper around each table
  visit(markdownAST, 'table', (node, index, parent) => {
    const wrapper = {
      type: 'TableContainer',
      data: {
        hName: 'div',
        hProperties: { className: 'table-container' },
      },
      children: [node],
    };

    parent.children[index] = wrapper;
  });

  // Both image and video elements use the `![](...)` syntax. Here, we
  // - transform image elements (not already processed by gatsby-remark-images-anywhere)
  //   into <figure><picture><img></picture></figure> elements
  // - transform video elements into <figure><video></video></figure> elements
  visit(markdownAST, 'image', (node, index, parent) => {
    const fileMimeType = mime.lookup(node.url);
    const transformedNodeHTML = createMediaMarkup(
      fileMimeType.startsWith('video/')
        ? {
            kind: 'video',
            sources: [{ src: node.url, type: mime.lookup(node.url) }],
            alt: node.alt,
          }
        : {
            kind: 'image',
            fallback: { src: node.url },
            alt: node.alt,
          },
    );

    const wrapper = {
      type: 'html',
      value: transformedNodeHTML,
    };

    parent.children[index] = wrapper;
  });

  // Unnest paragraphs that include a block tag.
  // The practical use case is to unnest a <figure> tag that is wrapped in a <p> tag. This case
  // happens because gatsby-config-create-image-markup.js wraps images with a <figure> tag.
  // This is needed because <p> tags cannot contain <figure> tags, which results in two broken empty <p> tags
  // being rendered.
  visit(markdownAST, 'paragraph', (node, index, parent) => {
    if (node.children.length === 1 && node.children[0].type === 'html') {
      const parsedHTML = parser(node.children[0].value);
      const rootTag = parsedHTML[0].tag;
      if (blockElements.includes(rootTag)) {
        parent.children.splice(index, 1, ...node.children);
      }
    }
  });

  // Sidenote:
  //  - make sure that in HTML, sidenote text (“block heading”) follows the primary text (“block body”)
  //  - make the sidenote text a <blockquote> for better rendering in Pocket/Feedly/etc
  //  - add a “Sidenote:” remark that’s visible on mobile and in Pocket/Feedly/etc
  visit(
    markdownAST,
    (node) => node.type === 'containerDirective' && node.name === 'sidenote',
    (node) => {
      const heading = node.children.find(
        (child) => child.data.directiveLabel === true,
      );
      const body = node.children.filter((child) => child !== heading);

      heading.data ??= {};
      heading.data.hName = 'blockquote';
      heading.data.hProperties ??= {};
      heading.data.hProperties.className = 'sidenote__heading';

      heading.children.unshift({
        type: 'html',
        value: '<strong class="sidenote__remark">Sidenote:</strong> ',
      });

      node.data ??= {};
      node.data.hProperties ??= {};
      node.data.hProperties.className = 'sidenote';
      node.children = [
        {
          type: '_3perfContainer',
          data: {
            hName: 'div',
            hProperties: { className: 'sidenote__body' },
          },
          children: body,
        },
        heading,
      ];
    },
  );

  // Note:
  //  - make the note render a <blockquote> for better rendering in Pocket/Feedly/etc
  visit(
    markdownAST,
    (node) => node.type === 'containerDirective' && node.name === 'note',
    (node) => {
      node.data ??= {};
      node.data.hName = 'blockquote';
      node.data.hProperties ??= {};
      node.data.hProperties.className = 'note';
    },
  );

  visit(
    markdownAST,
    (node) => node.type === 'html' && parseHTMLCodeOptions(node)?.wordWrap,
    (node) => {
      const $ = cheerio.load(node.value);
      const root = $('div.gatsby-highlight');

      if (root.length === 0) {
        throw new Error(
          `gatsby-remark-3perf-transformer: Expected a div with class "gatsby-highlight" but got ${
            $.root().children().first().prop('tagName') || 'no element'
          } with class "${
            $.root().children().first().attr('class') || 'no class'
          }"`,
        );
      }

      root.attr('data-word-wrap', '');
      node.value = $.html();
    },
  );

  // Spread lists that have new lines between list items
  visitWithAncestors(markdownAST, 'list', (node, ancestors) => {
    // Don't do anything with table-of-contents lists
    if (ancestors.some((ancestor) => ancestor.type === 'Toc')) {
      return;
    }

    // .list_spread/.list_compact
    const className = _.get(node, 'data.hProperties.className', []).concat(
      node.spread ? 'list_spread' : 'list_compact',
    );
    _.set(node, 'data.hProperties.className', className);
  });

  return markdownAST;
};

function parseHTMLCodeOptions(node) {
  // If you have Markdown like
  // ```javascript{wordWrap: true}
  // ...
  // ```
  // then node.lang will be everything before the space (`javascript{wordWrap:`) and node.meta will be everything after the space (`true`).
  // Thus, we need to concatenate these to get the original string (`javascript{wordWrap: true}`).
  // This mimics what gatsby-remark-prismjs does: https://github.com/gatsbyjs/gatsby/blob/346314d678d9465c998c12466f810b21592f6cb5/packages/gatsby-remark-prismjs/src/index.js#L38-L48
  if (!node.lang) return;
  const language = node.meta ? node.lang + node.meta : node.lang;
  if (!language) return;

  const optionsStringWithoutBraces = language.split('{')[1];
  if (!optionsStringWithoutBraces) return;

  const optionsString = '{' + optionsStringWithoutBraces;

  try {
    const optionsJson = JSON5.parse(optionsString);
    return optionsJson;
  } catch (e) {
    console.error(
      'gatsby-remark-3perf-transformer: Failed to parse options for a code block:',
      e,
    );
    console.error('gatsby-remark-3perf-transformer: Original node:', node);
    console.error(
      'gatsby-remark-3perf-transformer: Options string:',
      optionsString,
    );
    throw new Error(
      `gatsby-remark-3perf-transformer: Failed to parse options for a code block: ${e.message}. See the error message above for more details.`,
    );
  }
}
