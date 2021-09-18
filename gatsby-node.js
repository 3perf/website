const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const templatePerSourceName = {
    blog: path.resolve(`./src/templates/blog/index.tsx`),
  };

  const result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                sourceName
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages
  const pages = result.data.allMarkdownRemark.edges;

  pages.forEach((page, index) => {
    const previous = index === pages.length - 1 ? null : pages[index + 1].node;
    const next = index === 0 ? null : pages[index - 1].node;

    createPage({
      path: page.node.fields.slug,
      component: templatePerSourceName[page.node.fields.sourceName],
      context: {
        slug: page.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const pathPrefix = '/blog';
    const filePath = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'sourceName',
      value: fileNode.sourceInstanceName,
    });
    createNodeField({
      node,
      name: 'slug',
      value: `${pathPrefix}${filePath}`,
    });
  }
};
