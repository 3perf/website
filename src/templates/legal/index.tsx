import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import WidthWrapper from '../../components/WidthWrapper';
import { Content, Footer, Header, RelatedLinks, Nav, Title } from './styled';

interface ComponentProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    markdownRemark: {
      id: string;
      html: string;
      headings: { value: string }[];
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
  };
}

const Component = ({ data }: ComponentProps) => {
  const siteMetadata = data.site.siteMetadata;
  const page = data.markdownRemark;

  const title = data.markdownRemark.frontmatter.title;

  return (
    <Layout>
      <WidthWrapper>
        <Helmet>
          <title>
            {title} · {siteMetadata.title}
          </title>
        </Helmet>
        <Nav logoKind={LogoKind.Black} />
        <Header>
          <Title>{title}</Title>
        </Header>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Content>
        <RelatedLinks>
          All legal stuff: <a href="/legal/terms/">Terms and Conditions</a> ·{' '}
          <a href="/legal/privacy/">Privacy Policy</a>
        </RelatedLinks>
        <Footer license={false} />
      </WidthWrapper>
    </Layout>
  );
};

export default Component;

// The `$slug` parameter is inserted by the `context` option of `createPage`
// in `gatsby-node.js`
export const pageQuery = graphql`
  query LegalPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
