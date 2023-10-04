const createMediaMarkup = require('./plugins/gatsby-remark-3perf-transformer/createMediaMarkup.js');

let siteUrl = 'https://3perf.com';
if (process.env.DEV_SITE_HOSTNAME_OVERRIDE) {
  siteUrl = `http://${process.env.DEV_SITE_HOSTNAME_OVERRIDE}`;
  console.log(
    'gatsby-config.js: Due to process.env.DEV_SITE_HOSTNAME_OVERRIDE, setting the siteUrl to:',
    siteUrl,
  );
} else if (process.env.NETLIFY) {
  siteUrl =
    process.env.BRANCH === 'master'
      ? // Primary site url
        process.env.URL
      : // Url of a deploy preview
        process.env.DEPLOY_URL;

  console.log(
    'gatsby-config.js: Doing a Netlify deploy with the site url:',
    siteUrl,
  );
}

module.exports = {
  jsxRuntime: 'automatic',
  trailingSlash: 'always',
  flags: {
    PARTIAL_HYDRATION: true,
  },
  siteMetadata: {
    title: 'PerfPerfPerf',
    description: 'We help companies to earn more by making web apps faster',
    twitterId: '3perfcom',
    siteUrl: siteUrl,
    logoUrl: `${siteUrl}/logo-black-raster.png`,
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          // Disable the placeholder since we don’t use it in our custom image implementation
          placeholder: 'none',
        },
      },
    },
    `gatsby-transformer-sharp`,
    'gatsby-plugin-lodash',
    // Ignore .styled.ts files
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: ['**/styled.ts', '**/*.styled.ts', '**/slides.content.tsx'],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.component\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'components',
        path: `${__dirname}/src/components`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'shared',
        path: `${__dirname}/src/shared`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'blog',
        path: `${__dirname}/src/content/blog/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'legal',
        path: `${__dirname}/src/content/legal/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-3perf-table-of-contents`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '→',
            },
          },
          '@weknow/gatsby-remark-twitter',
          {
            resolve: `gatsby-remark-images-anywhere`,
            options: {
              // Sharp options
              maxWidth: 900,
              quality: 100,
              withWebp: { quality: 100 },

              // Custom image markup (simplified & with support for `scrollable`)
              // Passed options are listed at https://www.gatsbyjs.org/packages/gatsby-remark-images-anywhere/#writing-your-own-markup
              createMarkup: function createImageMarkup({
                alt,
                src,
                srcSet,
                srcWebp,
                srcSetWebp,
                sizes,
                presentationWidth,
                presentationHeight,
              }) {
                return createMediaMarkup({
                  kind: 'image',
                  alt,
                  fallback: {
                    src,
                    srcSet,
                    sizes,
                  },
                  sources: srcWebp
                    ? [
                        {
                          src: srcWebp,
                          srcSet: srcSetWebp,
                          sizes,
                          type: 'image/webp',
                        },
                      ]
                    : [],
                  presentationWidth,
                  presentationHeight,
                });
              },
            },
          },
          `gatsby-remark-3perf-directive`,
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              // Include images not processed by `gatsby-image`
              ignoreFileExtensions: [],
            },
          },
          `gatsby-remark-reading-time`,
          `gatsby-remark-3perf-transformer`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'PerfPerfPerf',
        short_name: 'PerfPerfPerf',
        start_url: '/',
        display: 'browser',
        background_color: '#000',
        icon: './static/3perf-logo-favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                image_url: logoUrl
              }
            }
          }
        `,
        setup: ({
          query: {
            site: { siteMetadata },
            ...rest
          },
        }) => {
          return {
            title: siteMetadata.title,
            description: siteMetadata.description,
            // eslint-disable-next-line @typescript-eslint/camelcase
            site_url: siteMetadata.site_url,
            // eslint-disable-next-line @typescript-eslint/camelcase
            image_url: siteMetadata.image_url,
            // eslint-disable-next-line @typescript-eslint/camelcase
            custom_namespaces: {
              media: 'http://search.yahoo.com/mrss/',
            },
            ...rest,
          };
        },
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const siteMeta = site.siteMetadata;
                const postMeta = edge.node.frontmatter;

                return {
                  title: postMeta.title,
                  description: postMeta.rssDescription,
                  date: postMeta.date.published,
                  author: postMeta.author.name,
                  url: siteMeta.siteUrl + edge.node.fields.slug,
                  guid:
                    postMeta.rssForceGuid ||
                    siteMeta.siteUrl + edge.node.fields.slug,
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  custom_elements: [
                    {
                      'content:encoded': edge.node.html,
                    },
                    postMeta.socialImage.facebook && {
                      'media:content': {
                        _attr: {
                          url:
                            siteMeta.siteUrl +
                            postMeta.socialImage.facebook.publicURL,
                          medium: 'image',
                        },
                      },
                    },
                  ].filter(Boolean),
                };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {fields: { sourceName: { eq: "blog" } }},
                  sort: {frontmatter: {date: {published: DESC}}}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date {
                          published
                        }
                        author {
                          name
                        }
                        socialImage {
                          facebook {
                            publicURL
                          }
                        }
                        rssDescription
                        rssForceGuid
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'PerfPerfPerf Blog',
          },
        ],
      },
    },
  ],
};
