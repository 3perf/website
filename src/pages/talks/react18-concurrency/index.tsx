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
import SlidesContent from './slides.content';
import socialCoverUrl from './slides/title.png';

interface React18ConcurrencyPageProps {
  data: {
    indexSlide: {
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

const publishedDate = new Date(2022, 8, 27);
const lastUpdatedDate = new Date(2022, 8, 27);

const fullSocialCoverUrl = `https://3perf.com${socialCoverUrl}`;

const meta = {
  title: 'React 18 Concurrency, Explained',
  description: "Learn about React 18 Concurrency, it's benefits and drawbacks",
  url: 'https://3perf.com/3perf-logo-black-raster.png',
};

const React18ConcurrencyPage = ({ data }: React18ConcurrencyPageProps) => {
  return (
    <Layout>
      <WidthWrapper>
        {/* ! Suggestion: move basic meta tags for article to a separate component,
              that takes props like title, description, url, author, etc. */}
        <Helmet>
          <title>React 18 Concurrency, Explained | PerfPerfPerf</title>

          <meta name="description" content={meta.description} />
          <meta name="image" content={fullSocialCoverUrl} />
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
          imageData={data.indexSlide.childImageSharp.gatsbyImageData}
          title={meta.title}
          description={
            <>
              <p>
                This is an introduction React 18 concurrency. Learn why it is
                important, what performance optimizations it provides, and when
                should you use it to make your app perform better.
              </p>
              <p>
                <strong>Want to apply this advice to your site?</strong> We help
                companies like Framer, Toggl, SitePoint to get faster – and we’d
                be happy to help you as well! <a href="/#services">Reach out</a>
              </p>
            </>
          }
        />
        <Slides>
          <SlidesContent />
        </Slides>
        <TalkMeta
          authors={[
            {
              description: 'PerfPerfPerf founder',
              imageData: data.iamakulovPhoto.childImageSharp.gatsbyImageData,
              link: 'https://twitter.com/iamakulov',
              name: 'Ivan Akulov',
            },
          ]}
          lastUpdatedDate={lastUpdatedDate}
        />
        <Footnote>
          <p>
            <strong>Want to apply this advice to your site?</strong> We’ve
            worked with Google, Framer, SitePoint, and other companies.{' '}
            <a href="/#services">Reach out</a>
          </p>
        </Footnote>
        <Footer />
      </WidthWrapper>
    </Layout>
  );
};

export default React18ConcurrencyPage;

export const query = graphql`
  {
    indexSlide: file(
      sourceInstanceName: { eq: "pages" }
      relativePath: { eq: "talks/react18-concurrency/slides/title.png" }
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
          width: 48
          height: 48
          quality: 90
          placeholder: NONE
          layout: FIXED
          formats: [AUTO]
        )
      }
    }
  }
`;
