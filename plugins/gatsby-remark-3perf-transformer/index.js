const _ = require('lodash');
const visit = require('unist-util-visit');
const visitWithAncestors = require('unist-util-visit-parents');

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

  // Add a <figure class="image-container"> wrapper around each (non-processed by gatsby-remark-images-anywhere) image
  visit(markdownAST, 'image', (node, index, parent) => {
    const wrapper = {
      type: 'ImageContainer',
      data: {
        hName: 'figure',
        hProperties: { className: 'image-container' },
      },
      children: [node],
    };

    parent.children[index] = wrapper;
  });

  // Sidenote:
  //  - make sure that in HTML, sidenote text (“block heading”) follows the primary text (“block body”)
  //  - make the sidenote text a <blockquote> for better rendering in Pocket/Feedly/etc
  //  - add a “Sidenote:” remark that’s visible on mobile and in Pocket/Feedly/etc
  visit(markdownAST, 'sidenoteCustomBlock', (node) => {
    const [heading, body] = node.children;
    heading.data.hName = 'blockquote';
    heading.children.unshift({
      type: 'html',
      value: '<strong class="sidenote__remark">Sidenote:</strong> ',
    });
    node.children = [body, heading];
  });

  // Spread lists that have new lines between list items
  visitWithAncestors(markdownAST, 'list', (node, ancestors) => {
    // Don’t do anything with table-of-contents lists
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
