const visit = require('unist-util-visit');

module.exports = ({ markdownAST }, pluginOptions) => {
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

  return markdownAST;
};
