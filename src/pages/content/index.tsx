import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import GatsbyImage from '../../components/Image';
import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import { NavKind } from '../../components/NavBase';
import WidthWrapper from '../../components/WidthWrapper';
import {
  Background,
  BadgeImage,
  Footer,
  Header,
  ItemDescription,
  ItemImage,
  ItemLink,
  ItemTitle,
  MailchimpSubscribe,
  Nav,
  NewBadge,
  Section,
  SectionHeader,
} from '../../pages-styled/content.styled';
import { JSXChildrenProp, SharpImageFixed } from '../../types';
import facebookCoverUrl from './facebook-cover.png';
import twitterCoverUrl from './twitter-cover.png';

interface ContentPageProps {
  data: {
    webPerf101: SharpImageFixed;
    webpackLibs: SharpImageFixed;
    notion: SharpImageFixed;
  };
}

interface ContentItemProps {
  image?: SharpImageFixed;
  title: string | JSXChildrenProp;
  description?: string | JSXChildrenProp;
  link: string;
  isNew?: boolean;
}
const ContentItem = ({
  image,
  title,
  description,
  link,
  isNew,
}: ContentItemProps) => {
  return (
    <ItemLink to={link}>
      {image && (
        <ItemImage>
          <GatsbyImage fixed={image.childImageSharp.fixed} />
        </ItemImage>
      )}
      <div>
        <ItemTitle>{title}</ItemTitle>
        &nbsp;
        {isNew && <NewBadge>New</NewBadge>}
      </div>
      {description && <ItemDescription>{description}</ItemDescription>}
    </ItemLink>
  );
};

const ContentPage = (props: ContentPageProps) => {
  return (
    <Background>
      <Layout>
        <WidthWrapper>
          <Helmet>
            <title>Talks, articles and tools by PerfPerfPerf</title>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image:src" content={twitterCoverUrl} />
            <meta name="og:image" content={facebookCoverUrl} />
          </Helmet>
          <Nav logoKind={LogoKind.White} navKind={NavKind.Light} />
          <Header>
            We’re Perf&shy;Perf&shy;Perf.
            <br />
            We do per&shy;for&shy;mance.
          </Header>
          <SectionHeader>Articles</SectionHeader>
          <Section>
            <ContentItem
              link="/talks/web-perf-101/"
              image={props.data.webPerf101}
              title="Web performance 101"
              description="A comprehencive guide into modern loading performance"
            />
            <ContentItem
              link="https://github.com/iamakulov/awesome-webpack-perf"
              title="awesome-webpack-perf"
              description="A curated list of webpack tools for web performance"
            />
            <ContentItem
              link="https://iamakulov.com/notes/optimize-images-webpack/"
              title="How to optimize images in webpack"
            />
            <ContentItem
              link="/blog/perf-for-startups/"
              title="Quick apps in 3 steps"
              description="What to do if you want to have a quick app – but don’t have enough time for that"
            />
            <ContentItem
              link="https://iamakulov.com/notes/caching/"
              title="Short basics of caching"
            />
            <ContentItem
              link="https://iamakulov.com/notes/walmart/"
              title="Case study: Analyzing the Walmart site performance"
              description="A deep-dive into improving Walmart’s site speed and conversion"
            />
            <ContentItem
              image={props.data.notion}
              link="/blog/notion/"
              title="Case study: Analyzing Notion app performance"
              description="How to make a React app load ~30% faster – just by tuning some configs and delaying some scripts"
              isNew
            />
            <ContentItem
              link="/blog/link-rels/"
              title="Preload, prefetch and other <link> tags"
            />
            <ContentItem
              link="https://developers.google.com/web/fundamentals/performance/webpack/"
              title="Web performance for webpack"
              description="Guide for Google Web Fundamentals"
            />
            <ContentItem
              link="https://github.com/GoogleChromeLabs/webpack-libs-optimizations"
              title="GoogleChromeLabs/webpack-libs-optimizations"
              image={props.data.webpackLibs}
              description="A community-contributed list of performance tips &amp; tricks
              for popular JS libraries. Created in collaboration with the
              Google Chrome team"
            />
            <ContentItem
              link="https://iamakulov.com/notes/polished-webpack/"
              title="Case study: Improving a popular library’s size for webpack users"
            />
            <ContentItem
              link="/blog/polyfills/"
              title="How to load polyfills only when needed"
              description="We’be been asked: “These days, how do you typically serve polyfills only to browsers that need them?”"
            />
            <ContentItem
              link="https://iamakulov.com/notes/resize-scroll/"
              title="How to optimize resizing or scrolling"
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
  query {
    webPerf101: file(
      relativePath: { eq: "talks/web-perf-101/slides/index.png" }
    ) {
      childImageSharp {
        fixed(height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }

    notion: file(relativePath: { eq: "content/notion-social.png" }) {
      childImageSharp {
        fixed(height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }

    webpackLibs: file(relativePath: { eq: "content/webpack-libs.png" }) {
      childImageSharp {
        fixed(height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
