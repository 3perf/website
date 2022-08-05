import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { ImageFluid, ImageFixed } from '../../../components/Image';
import Layout from '../../../components/Layout';
import { LogoKind } from '../../../components/Logo';
import WidthWrapper from '../../../components/WidthWrapper';
import TalkHeader from '../../../components/talks/TalkHeader';
import { Footer, Footnote, Nav, Slides } from '../styled';
import SlidesContent from './slides.content';
import indexCoverUrl from './slides/slide1.png';

interface CwvCnnPageProps {
  data: {
    indexSlide: {
      childImageSharp: {
        fluid: ImageFluid;
      };
    };
    iamakulovPhoto: {
      childImageSharp: {
        fixed: ImageFixed;
      };
    };
  };
}

const resolvedCoverUrl = `https://3perf.com${indexCoverUrl}`;

const publishedDate = new Date(2022, 6, 8);

const CwvCnnPage = ({ data }: CwvCnnPageProps) => {
  return (
    <Layout>
      <WidthWrapper>
        <Helmet>
          <title>[Draft] Core Web Vitals (CNN Case Study)</title>
          {/* TODO: remove when done ↓ */}
          <meta name="robots" content="noindex,nofollow" />
          <meta name="description" content="TODO" />
          <meta name="image" content={resolvedCoverUrl} />
          <meta itemProp="name" content="TODO" />
          <meta itemProp="description" content="TODO" />
          <meta itemProp="image" content={resolvedCoverUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="TODO" />
          <meta name="twitter:description" content="TODO" />
          <meta name="twitter:site" content="@3perfcom" />
          <meta name="twitter:creator" content="@iamakulov" />
          <meta name="twitter:image:src" content={resolvedCoverUrl} />
          <meta name="og:title" content="TODO" />
          <meta name="og:description" content="TODO" />
          <meta property="og:url" content="https://3perf.com/talks/cwv-cnn/" />
          <meta property="og:image" content={resolvedCoverUrl} />
          <meta property="og:site_name" content="PerfPerfPerf" />
          <meta property="fb:admins" content="100002052594007" />
          <meta property="og:type" content="article" />
          <meta property="article:author" content="Ivan Akulov" />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TechArticle',
              headline: 'TODO',
              description: 'TODO',
              image: resolvedCoverUrl,
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
              mainEntityOfPage: {
                '@type': 'WebPage',
                url: 'https://3perf.com/talks/cwv-cnn/',
              },
            })}
          </script>
          <meta property="foo" content="test" />
        </Helmet>
        <Nav logoKind={LogoKind.Black} />
        <TalkHeader
          imageData={data.indexSlide.childImageSharp.fluid}
          title="[Draft] Core Web Vitals (CNN Case Study)"
          description={
            <>
              <p>
                Core Web Vitals are three performance metrics that measure how
                quickly a site loads. Google uses these metrics to show faster
                sites higher in search results.
              </p>
              <p>
                The metrics are called Largest Contentful Paint (LCP), First
                Input Delat (FID), and Cumulative Layout Shift (CLS).
              </p>
              <p>
                In this talk, let’s look at what Largest Contentful Paint, First
                Input Delay, and Cumulative Layout Shift are, how to profile
                them with WebPageTest and Chrome DevTools, and how to improve
                them if the site is slow.
              </p>
            </>
          }
        />
        <Slides>
          <SlidesContent />
        </Slides>
        <Footnote>
          <p>
            <strong>This talk was brought to you by PerfPerfPerf.</strong> We
            help companies to earn more by making web apps faster.
          </p>
          <p>
            Have a web performance issue or just want to learn what to improve?{' '}
            <a href="/#services">We’d be glad to help</a>
          </p>
        </Footnote>
        <Footer />
      </WidthWrapper>
    </Layout>
  );
};

export default CwvCnnPage;

export const query = graphql`
  query {
    indexSlide: file(
      sourceInstanceName: { eq: "pages" }
      relativePath: { eq: "talks/cwv-cnn/slides/slide1.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...ImageFluid
        }
      }
    }

    iamakulovPhoto: file(
      sourceInstanceName: { eq: "shared" }
      relativePath: { eq: "iamakulov.jpg" }
    ) {
      childImageSharp {
        fixed(width: 48, height: 48, quality: 90) {
          ...ImageFixed
        }
      }
    }
  }
`;
