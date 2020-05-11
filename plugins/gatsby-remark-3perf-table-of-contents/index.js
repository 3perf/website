// This is a forked version of https://github.com/signalwerk/gatsby-remark-table-of-contents,
// by @signalwerk
// Supported options:
// - exclude (from the original plugin)
// - fromHeading (from the original plugin)
// - toHeading (from the original plugin)
// - header: string – a header to add in front of the table of contents, e.g. “Contents”

const yaml = require('js-yaml');
const util = require('mdast-util-toc');

const transformer = (markdownAST, pluginOptions) => {
  // find position of TOC
  const index = markdownAST.children.findIndex(
    (node) => node.type === 'code' && node.lang === 'toc',
  );

  // we have no TOC
  if (index === -1) {
    return;
  }

  let prefs = {
    tight: false,
    fromHeading: 1,
    toHeading: 6,
    ...pluginOptions,
  };

  try {
    const parsePrefs = yaml.safeLoad(markdownAST.children[index].value);
    prefs = { ...prefs, ...parsePrefs };
  } catch (e) {
    console.log("Can't parse TOC-Configuration", e);
  }

  // this is the ast we need to consider
  const tocMarkdownAST = {
    ...markdownAST,
    children: [],
  };

  // add all headings
  markdownAST.children.forEach((node) => {
    if (node.type === 'heading' && node.depth > prefs.fromHeading - 1) {
      tocMarkdownAST.children.push(node);
    }
  });

  // calculate TOC
  const result = util(tocMarkdownAST, {
    maxDepth: prefs.toHeading,
    tight: prefs.tight,
    skip: Array.isArray(prefs.exclude)
      ? prefs.exclude.join('|')
      : prefs.exclude,
  });

  // compose the header
  const header = prefs.header
    ? {
        type: 'html',
        value: `<h1 class="toc__header">${prefs.header}</h1>`,
      }
    : null;

  // insert the TOC≤
  markdownAST.children = [].concat(
    markdownAST.children.slice(0, index),
    {
      type: 'Toc',
      data: {
        hName: 'nav',
        hProperties: {
          className: header ? 'toc toc_with-header' : 'toc',
        },
      },
      children: header ? [header, result.map] : [result.map],
    },
    markdownAST.children.slice(index + 1),
  );
};

module.exports = ({ markdownAST }, pluginOptions) => {
  return transformer(markdownAST, pluginOptions);
};
