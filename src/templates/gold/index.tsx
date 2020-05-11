import { graphql } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';
import Script from 'react-script-tag';
import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import WidthWrapper from '../../components/WidthWrapper';
import lockIcon from './lock.svg';
import {
  ClientLogo,
  Content,
  Footer,
  MetaIcon,
  HeaderContainer,
  Meta,
  Nav,
  PrintButton,
  Title,
} from './styled';

interface ComponentProps {
  data: {
    markdownRemark: {
      id: string;
      excerpt: string;
      html: string;
      frontmatter: {
        gold: {
          title: string;
          date: string;
          client: string;
          clientLogo?: {
            publicURL: string;
          };
        };
      };
    };
  };
}

const Header = ({
  clientLogoUrl,
  title,
  date,
  client,
}: {
  clientLogoUrl?: string;
  title: string;
  date: string;
  client: string;
}) => {
  const commonMeta = (
    <>
      <>
        <MetaIcon src={lockIcon} />
        &nbsp;Private
      </>{' '}
      · {date}
      {clientLogoUrl ? null : <> · {client}</>}
    </>
  );

  return (
    <>
      <HeaderContainer media="screen">
        {clientLogoUrl && <ClientLogo src={clientLogoUrl} />}
        <Title>{title}</Title>
        <Meta>
          {commonMeta} ·{' '}
          <PrintButton className="js--print-button">
            Print or save as PDF
          </PrintButton>
        </Meta>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                document.querySelector('.js--print-button').addEventListener('click', () => {
                  window.print();
                })
              `,
          }}
        />
      </HeaderContainer>
      <HeaderContainer media="print">
        {clientLogoUrl && <ClientLogo src={clientLogoUrl} />}
        <Title>{title}</Title>
        <Meta>{commonMeta} · By PerfPerfPerf</Meta>
      </HeaderContainer>
    </>
  );
};

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
        <Header
          clientLogoUrl={pageMeta.clientLogo?.publicURL}
          title={pageMeta.title}
          date={pageMeta.date}
          client={pageMeta.client}
        />
        <Content>
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Content>
        <Footer
          license={`Sharing prohibited unless approved by ${pageMeta.client}`}
          useLicenseFontSpacing={false}
        />
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
  query GoldPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        gold {
          title
          date(formatString: "D MMMM YYYY")
          client
          clientLogo: logo {
            publicURL
          }
        }
      }
    }
  }
`;
