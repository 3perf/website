import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Script from 'react-script-tag';
import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import WidthWrapper from '../../components/WidthWrapper';
import {
  BlogFooterAccordion,
  Content,
  Footer,
  Header,
  MailchimpSubscribe,
  Meta,
  Nav,
  Title,
} from './styled';

interface ComponentProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        twitterId: string;
        siteUrl: string;
      };
    };
    markdownRemark: {
      id: string;
      excerpt: string;
      html: string;
      frontmatter: {
        blog: {
          title: {
            visible: string;
            social: string;
            seo: string;
          };
          description: string;
          date: {
            published: string;
            formattedPublished: string;
            modified: string;
            formattedModified: string;
          };
          socialImage: {
            facebook: {
              publicURL: string;
            };
            twitter: {
              publicURL: string;
            };
          };
          author: {
            name: string;
            link: string;
            twitterId: string;
            facebookId: string;
          };
        };
      };
    };
  };
}

const Component = ({ data }: ComponentProps) => {
  const siteMetadata = data.site.siteMetadata;
  const page = data.markdownRemark;
  const articleMeta = page.frontmatter.blog;
  const authorDetails = articleMeta.author;

  const visibleTitle =
    typeof articleMeta.title === 'string'
      ? articleMeta.title
      : articleMeta.title.visible;
  const socialTitle =
    typeof articleMeta.title === 'string'
      ? articleMeta.title
      : articleMeta.title.social;
  const seoTitle =
    typeof articleMeta.title === 'string'
      ? articleMeta.title
      : articleMeta.title.seo;

  return (
    <Layout>
      <WidthWrapper>
        <Helmet>
          <title>
            {seoTitle} · {siteMetadata.title}
          </title>
          <meta name="description" content={articleMeta.description} />
          <meta
            name="image"
            content={
              siteMetadata.siteUrl + articleMeta.socialImage.facebook.publicURL
            }
          />
          <meta itemProp="name" content={seoTitle} />
          <meta itemProp="description" content={articleMeta.description} />
          <meta
            itemProp="image"
            content={
              siteMetadata.siteUrl + articleMeta.socialImage.facebook.publicURL
            }
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={socialTitle} />
          <meta name="twitter:description" content={articleMeta.description} />
          <meta name="twitter:site" content={`@${siteMetadata.twitterId}`} />
          <meta
            name="twitter:creator"
            content={`@${authorDetails.twitterId}`}
          />
          <meta
            name="twitter:image:src"
            content={
              siteMetadata.siteUrl + articleMeta.socialImage.twitter.publicURL
            }
          />
          <meta name="og:title" content={socialTitle} />
          <meta name="og:description" content={articleMeta.description} />
          <meta
            name="og:image"
            content={
              siteMetadata.siteUrl + articleMeta.socialImage.facebook.publicURL
            }
          />
          <meta name="og:site_name" content={siteMetadata.title} />
          <meta name="fb:admins" content={authorDetails.facebookId} />
          <meta name="og:type" content="article" />
          <meta
            name="article:published_time"
            content={articleMeta.date.published}
          />
          <meta name="article:author" content={authorDetails.name} />
          <meta
            name="article:modified_time"
            content={articleMeta.date.modified}
          />
        </Helmet>
        <Nav logoKind={LogoKind.Black} />
        <Header>
          <Title>{visibleTitle}</Title>
          <Meta>
            {articleMeta.date.modified === articleMeta.date.published ? (
              <time dateTime={articleMeta.date.published}>
                {articleMeta.date.formattedPublished}
              </time>
            ) : (
              [
                `Published ${articleMeta.date.formattedPublished} · Last updated `,
                <time dateTime={articleMeta.date.modified} key="modified">
                  {articleMeta.date.formattedModified}
                </time>,
              ]
            )}{' '}
            ·{' '}
            <a href={authorDetails.link} rel="author">
              {authorDetails.name}
            </a>
          </Meta>
        </Header>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Content>
        <MailchimpSubscribe
          text="Performance articles, case studies, and more. A new email every few weeks. Subscribe:"
          buttonText="Grow my perf skills"
        />
        <BlogFooterAccordion />
        <Footer />
        {/* Inserting the Twitter script manually
         * since we’re disabling Gatsby JS with gatsby-plugin-no-javascript */}
        <Script async src="https://platform.twitter.com/widgets.js" />
      </WidthWrapper>
    </Layout>
  );
};

export default Component;

// The `$slug` parameter is inserted by the `context` option of `createPage`
// in `gatsby-node.js`
export const pageQuery = graphql`
  query BlogPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        twitterId
        siteUrl
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        blog {
          title {
            visible
            social
            seo
          }
          description
          date {
            published
            formattedPublished: published(formatString: "D MMMM YYYY")
            modified
            formattedModified: modified(formatString: "D MMMM YYYY")
          }
          socialImage {
            facebook {
              publicURL
            }
            twitter {
              publicURL
            }
          }
          author {
            name
            link
            twitterId
            facebookId
          }
        }
      }
    }
  }
`;
