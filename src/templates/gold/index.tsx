import { graphql } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import WidthWrapper from '../../components/WidthWrapper';
import { Content, Footer, Header, Meta, Nav, Title } from './styled';

interface ComponentProps {
  data: {
    markdownRemark: {
      id: string;
      excerpt: string;
      html: string;
      frontmatter: {
        gold: {
          title: string;
          author: string;
          date: string;
          client: string;
        };
      };
    };
  };
}

const Component = ({ data }: ComponentProps) => {
  const page = data.markdownRemark;
  const pageMeta = page.frontmatter.gold;

  return (
    <Layout>
      <WidthWrapper>
        <Helmet>
          <title>
            {pageMeta.title} · {pageMeta.client}
          </title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Nav logoKind={LogoKind.Black} />
        <Header>
          <Meta>
            {pageMeta.date} · {pageMeta.author} · {pageMeta.client}
          </Meta>
          <Title>{pageMeta.title}</Title>
        </Header>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Content>
        <Footer
          license={`Sharing prohibited unless approved by ${pageMeta.client}`}
          useLicenseFontSpacing={false}
        />
      </WidthWrapper>
    </Layout>
  );
};

export default Component;

// The `$slug` parameter is inserted by the `context` option of `createPage`
// in `gatsby-node.js`
export const pageQuery = graphql`
  query GoldPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        gold {
          title
          author
          date(formatString: "D MMMM YYYY")
          client
        }
      }
    }
  }
`;
