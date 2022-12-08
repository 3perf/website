import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../../components/Layout';
import { LogoKind } from '../../../components/Logo';
import WidthWrapper from '../../../components/WidthWrapper';
import TalkHeader from '../../../components/talks/TalkHeader';
import TalkMeta from '../../../components/talks/TalkMeta';
import { Footer, Footnote, Nav, Slides } from '../styled';
import socialCoverUrl from './cover.png';
import SlidesContent from './slides.content';

interface ReactConcurrencyPageProps {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
    cover: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    iamakulovPhoto: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
}

const publishedDate = new Date(2022, 8, 29);
const lastUpdatedDate = new Date(2022, 11, 8);

const meta = {
  title: 'React Concurrency, Explained',
  description:
    'Concurrent Rendering: when it helps, how it works under the hood, and why Vue.js/Preact refused to ship anything similar',
  url: 'https://3perf.com/talks/react-concurrency',
};

const ReactConcurrencyPage = ({ data }: ReactConcurrencyPageProps) => {
  const fullSocialCoverUrl = `${data.site.siteMetadata.siteUrl}${socialCoverUrl}`;

  return (
    <Layout>
      <WidthWrapper>
        {/* ! Suggestion: move basic meta tags for article to a separate component,
              that takes props like title, description, url, author, etc. */}
        <Helmet>
          <title>{meta.title} | PerfPerfPerf</title>

          <meta name="description" content={meta.description} />
          <meta name="image" content={fullSocialCoverUrl} />
          <link rel="canonical" href={meta.url} />
          <meta itemProp="name" content={meta.title} />
          <meta itemProp="description" content={meta.description} />
          <meta itemProp="image" content={fullSocialCoverUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:site" content="@3perfcom" />
          <meta name="twitter:creator" content="@iamakulov" />
          <meta name="twitter:image:src" content={fullSocialCoverUrl} />
          <meta name="og:title" content={meta.title} />
          <meta name="og:description" content={meta.description} />
          <meta property="og:url" content={meta.url} />
          <meta property="og:image" content={fullSocialCoverUrl} />
          <meta property="og:site_name" content="PerfPerfPerf" />
          <meta property="fb:admins" content="100002052594007" />
          <meta property="og:type" content="article" />
          <meta property="article:author" content="Ivan Akulov" />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              headline: meta.title,
              description: meta.description,
              image: fullSocialCoverUrl,
              author: {
                '@type': 'Person',
                name: 'Ivan Akulov',
                url: 'https://twitter.com/iamakulov',
              },
              publisher: {
                '@type': 'Organization',
                name: 'PerfPerfPerf',
                url: 'https://3perf.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://3perf.com/3perf-logo-black-raster.png',
                  width: 1500,
                  height: 1500,
                },
              },
              datePublished: publishedDate.toISOString(),
              dateModified: lastUpdatedDate.toISOString(),
              mainEntityOfPage: {
                '@type': 'WebPage',
                url: meta.url,
              },
            })}
          </script>
        </Helmet>
        <Nav logoKind={LogoKind.Black} />
        <TalkHeader
          imageData={data.cover.childImageSharp.gatsbyImageData}
          title={meta.title}
          description={
            <>
              <p>
                When the author of this talk first played with{' '}
                <code>useTransition</code>, the way it worked felt almost
                magical. An expensive render got butter-smooth, as if there was
                no JS to run!
              </p>
              <p>
                However, as the author later learned, to make this magic happen,
                React has to do a lot of heavy engineering.
              </p>
              <p>
                In this talk, let’s peek under the hood of React 18’s{' '}
                <code>useTransition</code> and <code>{`<Suspense>`}</code>, see
                how they work, and figure out what drawbacks they have (there’s
                no free lunch!).
              </p>
            </>
          }
        />
        <TalkMeta
          author={{
            imageData: data.iamakulovPhoto.childImageSharp.gatsbyImageData,
            link: 'https://twitter.com/iamakulov',
            name: 'Ivan Akulov',
          }}
        />
        <Slides>
          <SlidesContent />
        </Slides>
        <TalkMeta lastUpdatedDate={lastUpdatedDate} />
        <Footnote>
          <p>
            <strong>
              <mark>Want to apply this advice (& more) to your app?</mark>
            </strong>{' '}
            We helped React apps like Appsmith, Hugo, and Castor to get two,
            three, or even ten times faster and make customers happier.
          </p>
          <p>
            Check out <a href="/blog/causal/">a case study</a>, or{' '}
            <a href="/#services">let’s chat!</a>
          </p>
        </Footnote>
        <Footer />
      </WidthWrapper>
    </Layout>
  );
};

export default ReactConcurrencyPage;

export const query = graphql`
  {
    site {
      siteMetadata {
        siteUrl
      }
    }

    cover: file(
      sourceInstanceName: { eq: "pages" }
      relativePath: { eq: "talks/react-concurrency/cover.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          placeholder: NONE
          layout: CONSTRAINED
          formats: [AUTO]
        )
      }
    }

    iamakulovPhoto: file(
      sourceInstanceName: { eq: "shared" }
      relativePath: { eq: "iamakulov.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 24
          height: 24
          quality: 90
          placeholder: NONE
          layout: FIXED
          formats: [AUTO]
        )
      }
    }
  }
`;
