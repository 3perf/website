const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const templatePerSourceName = {
    gold: path.resolve(`./src/templates/gold/index.tsx`),
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  const pathPrefixPerSourceName = {
    gold: '/gold',
    blog: '/blog',
  };

  // The `sourceName` field is added by `gatsby-remark-source-name`
  if (node.internal.type === `MarkdownRemark`) {
    const pathPrefix = pathPrefixPerSourceName[node.fields.sourceName];
    const filePath = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: `${pathPrefix}${filePath}`,
    });
  }
};
