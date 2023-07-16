import { graphql } from 'gatsby';
import GatsbyImage from '../../components/Image';
import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import { NavKind } from '../../components/NavBase';
import WidthWrapper from '../../components/WidthWrapper';
import { GraphqlImage, JSXChildrenProp } from '../../types';
import facebookCoverUrl from './facebook-cover.png';
import {
  Background,
  Badge,
  BadgeImage,
  Footer,
  Header,
  ItemDescription,
  ItemImage,
  ItemLink,
  ItemTitle,
  MailchimpSubscribe,
  Nav,
  Section,
  SectionHeader,
} from './styled';
import twitterCoverUrl from './twitter-cover.png';

interface ContentPageProps {
  data: {
    reactConcurrency: GraphqlImage;
    webpackLibs: GraphqlImage;
    notion: GraphqlImage;
    reexports: GraphqlImage;
    polyfills: GraphqlImage;
    awesomeWebpackPerf: GraphqlImage;
  };
}

interface ContentItemProps {
  image?: GraphqlImage;
  title: string | JSXChildrenProp;
  description?: string | JSXChildrenProp;
  badge?: string | JSXChildrenProp;
  link: string;
}
const ContentItem = ({
  image,
  title,
  description,
  link,
  badge,
}: ContentItemProps) => {
  return (
    <ItemLink href={link}>
      {image && (
        <ItemImage>
          <GatsbyImage imageData={image.childImageSharp.gatsbyImageData} />
        </ItemImage>
      )}
      <div>
        <ItemTitle>{title}</ItemTitle>
        &nbsp;
        {badge && <Badge>{badge}</Badge>}
      </div>
      {description && <ItemDescription>{description}</ItemDescription>}
    </ItemLink>
  );
};

export function Head() {
  return (
    <>
      <title>Talks, articles and tools by PerfPerfPerf</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:src" content={twitterCoverUrl} />
      <meta name="og:image" content={facebookCoverUrl} />
    </>
  );
}

const ContentPage = (props: ContentPageProps) => {
  return (
    <Background>
      <Layout>
        <WidthWrapper>
          <Nav logoKind={LogoKind.White} navKind={NavKind.Light} />
          <Header>Web Perf Guides &amp; Tools</Header>
          <SectionHeader>Case Studies</SectionHeader>
          <Section>
            <ContentItem
              image={props.data.notion}
              link="/blog/notion/"
              title="Analyzing Notion app performance"
              description="How to make a React app load ~30% faster – just by tuning some configs and delaying some scripts"
            />
            <ContentItem
              link="/blog/causal/"
              title="Making React interactions in Causal 4× faster"
              badge="New"
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1522008502398554113"
              title="A dive into Spotify performance at 1 am"
            />
            <ContentItem
              link="https://iamakulov.com/notes/walmart/"
              title="Analyzing the Walmart site performance"
              description="A deep-dive into improving Walmart’s site speed and conversion"
            />
            <ContentItem
              link="https://iamakulov.com/notes/polished-webpack/"
              title="Improving a popular library’s size for webpack users"
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1223188926787178497"
              title="Webpack bundles, large and small"
            />
          </Section>
          <SectionHeader>Guides</SectionHeader>
          <Section>
            <ContentItem
              link="/talks/react-concurrency/"
              image={props.data.reactConcurrency}
              title="React Concurrency, Explained"
              badge="New"
            />

            <ContentItem
              link="/talks/web-perf-101/"
              title="Web Performance 101"
              description="A comprehencive guide into modern loading performance"
            />

            <ContentItem
              link="https://iamakulov.com/notes/optimize-images-webpack/"
              title="How to optimize images in webpack"
            />
            <ContentItem
              link="/blog/perf-for-startups/"
              title="Quick apps in 3 steps"
              description="Want to get faster with a minimal effort? Do this."
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1244762505685225472"
              title="How PerfPerfPerf’s site got to 100 in PageSpeed Insights"
              description="Spoiler alert: no client-side JavaScript"
            />
            <ContentItem
              link="https://iamakulov.com/notes/resize-scroll/"
              title="How to optimize resizing or scrolling"
            />
            <ContentItem
              link="/blog/react-monitoring/"
              title="How to monitor React render performance"
              description="So you just made your app fast. Now, how do you ensure it doesn’t get slow again?"
            />
            <ContentItem
              link="https://iamakulov.com/notes/caching/"
              title="Short basics of caching"
            />
            <ContentItem
              link="https://developers.google.com/web/fundamentals/performance/webpack/"
              title="Optimizing web performance in webpack"
              description="Guide for Google’s Web Fundamentals"
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1262391881364897796"
              title="How to remove bundle duplicates"
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1362397450456154114"
              title="How to find and fix unnecessary React rerenders"
            />
            <ContentItem
              link="/blog/polyfills/"
              title="How to load polyfills only when needed"
              image={props.data.polyfills}
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1377605414779510784"
              title="Tips to improve Cumulative Layout Shift"
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1313258115152912385"
              title="6 ways to optimize third parties"
            />
          </Section>
          <SectionHeader>References</SectionHeader>
          <Section>
            <ContentItem
              link="/blog/link-rels/"
              title="Preload, prefetch and other <link> tags"
            />
            <ContentItem
              link="https://github.com/GoogleChromeLabs/webpack-libs-optimizations"
              image={props.data.webpackLibs}
              title="webpack-libs-optimizations"
              description={
                <>
                  Performance tips &amp; tricks for popular JS libraries.
                  Created in collaboration with the Google Chrome team
                  <BadgeImage src="https://img.shields.io/github/stars/GoogleChromeLabs/webpack-libs-optimizations" />
                </>
              }
            />
            <ContentItem
              link="https://github.com/iamakulov/awesome-webpack-perf"
              title="awesome-webpack-perf"
              description={
                <>
                  A curated list of webpack tools for web performance
                  <BadgeImage src="https://img.shields.io/github/stars/iamakulov/awesome-webpack-perf" />
                </>
              }
            />
            <ContentItem
              link="https://github.com/iamakulov/devtools-perf-features"
              title="devtools-perf-features"
              badge="New"
              description="Chrome DevTools’ little known features for performance debugging"
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1372562184199364614"
              title="PerfPerfPerf's favorite tools"
              description={
                <>
                  <em>Non-webpack</em> tools for web performance
                </>
              }
            />
          </Section>
          <SectionHeader>Trivia</SectionHeader>
          <Section>
            <ContentItem
              link="https://twitter.com/iamakulov/status/1331551351214645251"
              title="Why reexports are bad for performance"
              image={props.data.reexports}
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1275769142809944064"
              title="1 💟 = 1 web perf tip"
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1353650608750825472"
              title={<code>/&#42;#__PURE__*/</code>}
              description="What it is and why it’s in every JS bundle – even though you likely never heard of it"
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1419658784134234112"
              title={
                <>
                  Antipattern: <code>&lt;link rel=&quot;preload&quot;&gt;</code>{' '}
                  and fonts
                </>
              }
            />
            <ContentItem
              link="https://twitter.com/iamakulov/status/1385230664648253443"
              title="Antipattern: objects in React contexts"
            />
          </Section>
          <SectionHeader>Tools</SectionHeader>
          <Section>
            <ContentItem
              link="https://googlefonts.3perf.com/"
              title="Google Fonts optimizer"
              description="A 550-byte script to make your Google Fonts render 1-3 seconds faster"
            />
            <ContentItem
              link="https://www.npmjs.com/package/moment-locales-webpack-plugin"
              title="moment-locales-webpack-plugin"
              description={
                <>
                  A webpack plugin that removes unused Moment locales and makes
                  the bundle hundreds of KBs smaller
                  <BadgeImage src="https://img.shields.io/npm/dw/moment-locales-webpack-plugin.svg" />
                </>
              }
            />
          </Section>
          <MailchimpSubscribe text="Performance articles, case studies, and more. Subscribe:" />
          <Footer license={false} />
        </WidthWrapper>
      </Layout>
    </Background>
  );
};

export default ContentPage;

export const query = graphql`
  {
    reactConcurrency: file(
      relativePath: { eq: "talks/react-concurrency/cover.png" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    notion: file(relativePath: { eq: "content/notion-social.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    webpackLibs: file(relativePath: { eq: "content/webpack-libs.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    reexports: file(relativePath: { eq: "content/reexports.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    polyfills: file(relativePath: { eq: "content/polyfills.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    awesomeWebpackPerf: file(
      relativePath: { eq: "content/awesome-webpack-perf.png" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
  }
`;
