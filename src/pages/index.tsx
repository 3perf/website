import { graphql } from 'gatsby';
import { Fragment, Suspense } from 'react';
import GatsbyImage from '../components/Image';
import Layout from '../components/Layout';
import { LogoKind } from '../components/Logo';
import { NavKind } from '../components/NavBase';
import WidthWrapper from '../components/WidthWrapper';
import type { GraphqlImage, JSXChildrenProp } from '../types';
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
  ItemSectionLabel,
  ItemTitle,
  MailchimpSubscribe,
  Nav,
  Section,
  DateYearHeader,
  SectionDateView,
  SectionHeader,
  AvatarImage,
  NameLink,
  Name,
  SortInput,
  SortPill,
  SortPills,
  SortLegend,
  SortSwitcher,
} from './index.styled';

interface ContentPageProps {
  data: {
    reactConcurrency: GraphqlImage;
    webPerf101: GraphqlImage;
    webpackLibs: GraphqlImage;
    notion: GraphqlImage;
    reexports: GraphqlImage;
    polyfills: GraphqlImage;
    awesomeWebpackPerf: GraphqlImage;
    photo: GraphqlImage;
    packer: GraphqlImage;
  };
}

type HomeImageKey =
  | 'notion'
  | 'packer'
  | 'reactConcurrency'
  | 'webPerf101'
  | 'webpackLibs'
  | 'reexports'
  | 'polyfills';

type SectionId =
  | 'caseStudies'
  | 'loadingAndImages'
  | 'bundles'
  | 'reactRuntime'
  | 'tooling';

type HomeContentItemBase = {
  section: SectionId;
  title: string | JSXChildrenProp;
  description?: string | JSXChildrenProp;
  badge?: string | JSXChildrenProp;
  isPopular?: boolean;
  imageKey?: HomeImageKey;
};

type HomeContentItem = HomeContentItemBase & {
  link: string;
  publishedAt: string;
};

const SECTION_ORDER: SectionId[] = [
  'caseStudies',
  'loadingAndImages',
  'bundles',
  'reactRuntime',
  'tooling',
];

const SECTION_HEADINGS: Record<SectionId, string> = {
  caseStudies: 'Case Studies',
  loadingAndImages: 'Loading, Fonts & Images',
  bundles: 'Bundles',
  reactRuntime: 'React & Runtime',
  tooling: 'Tooling',
};

type SortPillShapeKind = 'content' | 'date';

function SortPillShape({ kind }: { kind: SortPillShapeKind }) {
  if (kind === 'content') {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 126 31"
        preserveAspectRatio="none"
      >
        <path
          data-pill-fill
          d="M125.047 15.4954C125.047 6.99105 116.5 5.09695 111 3.09694C105.5 1.09694 98 -0.403073 84 0.0969111C77.1752 0.340645 47.2959 3.7697 40.5 3.09693C28.699 1.92868 23.9028 0.0969327 15.3984 0.0969327C6.89412 0.0969327 0 6.99105 0 15.4954C0 30.8938 6.89412 30.8938 15.3984 30.8938C23.9028 30.8938 44.5965 28.5969 63 28.5969C81.4035 28.5969 101.144 30.8938 109.648 30.8938C118.153 30.8938 125.047 23.9997 125.047 15.4954Z"
        />
        <path
          data-pill-stroke
          d="M84.0176 0.59671C97.9727 0.09833 105.405 1.59423 110.829 3.56644C113.634 4.58628 117.055 5.53121 119.818 7.27933C122.538 8.99991 124.547 11.4577 124.547 15.4951C124.547 23.7233 117.877 30.3936 109.648 30.3936C105.419 30.3936 98.3869 29.8215 90.0713 29.2461C81.771 28.6718 72.2201 28.0967 63 28.0967C53.7803 28.0967 43.9913 28.6718 35.4531 29.2461C26.8996 29.8215 19.6283 30.3936 15.3984 30.3936C13.2645 30.3936 11.2735 30.3928 9.46973 30.1573C7.67037 29.9223 6.09742 29.458 4.79395 28.5576C2.21651 26.7772 0.5 23.1469 0.5 15.4951C0.500121 7.26707 7.17033 0.59671 15.3984 0.59671C19.6104 0.59671 22.9045 1.04985 26.6328 1.65237C30.3635 2.25528 34.5316 3.00875 40.4512 3.59476C42.1963 3.76745 45.378 3.67559 49.2344 3.44534C53.1049 3.21424 57.6961 2.8404 62.2832 2.43851C71.4746 1.6332 80.6222 0.718001 84.0176 0.59671Z"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  } else if (kind === 'date') {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 -1.5 91.5 32"
        preserveAspectRatio="none"
      >
        <path
          data-pill-fill
          d="M91 14.5482C91 6.04819 84.5 2.04819 75.5 0.548191C66.5 -0.951809 55.5 1.04819 44.5 1.54819C33.5 2.04819 22.5 0.548191 13.5 0.0481908C4.5 -0.451809 0.5 6.04819 0.5 14.5482C0.5 23.0482 4.5 29.5482 13.5 29.5482C22.5 29.5482 34.5 27.5482 45.5 27.5482C56.5 27.5482 68.5 29.5482 77.5 29.5482C86.5 29.5482 91 23.0482 91 14.5482Z"
        />
        <path
          data-pill-stroke
          d="M91 14.5482C91 6.04819 84.5 2.04819 75.5 0.548191C66.5 -0.951809 55.5 1.04819 44.5 1.54819C33.5 2.04819 22.5 0.548191 13.5 0.0481908C4.5 -0.451809 0.5 6.04819 0.5 14.5482C0.5 23.0482 4.5 29.5482 13.5 29.5482C22.5 29.5482 34.5 27.5482 45.5 27.5482C56.5 27.5482 68.5 29.5482 77.5 29.5482C86.5 29.5482 91 23.0482 91 14.5482Z"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  } else {
    throw new Error(`Must be unreachable`);
  }
}

const HOME_CONTENT: HomeContentItem[] = [
  {
    section: 'caseStudies',
    imageKey: 'notion',
    publishedAt: '2020-05-19T20:00:00',
    link: '/blog/notion/',
    title: 'Analyzing Notion app performance',
    description:
      'How to make a React app load ~30% faster – just by tuning some configs and delaying some scripts',
    isPopular: true,
  },
  {
    section: 'caseStudies',
    publishedAt: '2022-11-24T09:00:00Z',
    link: '/blog/causal/',
    title: 'Making React interactions in Causal 4× faster',
  },
  {
    section: 'caseStudies',
    publishedAt: '2022-05-05T01:00:00',
    link: '/blog/spotify-1am/',
    title: 'A dive into Spotify performance at 1 am',
  },
  {
    section: 'caseStudies',
    publishedAt: '2019-05-20T12:00:00.000Z',
    link: 'https://iamakulov.com/notes/walmart/',
    title: 'Analyzing the Walmart site performance',
    description:
      'A deep-dive into improving Walmart’s site speed and conversion',
  },
  {
    section: 'caseStudies',
    publishedAt: '2019-03-12T12:00:00.000Z',
    link: 'https://iamakulov.com/notes/polished-webpack/',
    title: 'Improving Polished’s bundle size for webpack users',
  },
  {
    section: 'caseStudies',
    publishedAt: '2020-01-31T10:19:00.554Z',
    link: 'https://twitter.com/iamakulov/status/1223188926787178497',
    title: 'Webpack bundles, large and small',
  },
  {
    section: 'caseStudies',
    publishedAt: '2024-05-30T00:00:00.000Z',
    link: 'https://www.framer.com/blog/introducing-avif-support/',
    title: 'How Framer integrated AVIF',
    description:
      'Serving AVIF across Framer (~20% smaller files) without slow first loads',
  },
  // Loading & images — network, HTTP, images, fonts, caching, third parties
  {
    section: 'loadingAndImages',
    imageKey: 'webPerf101',
    publishedAt: '2018-10-25T00:00:00.000Z',
    link: '/talks/web-perf-101/',
    title: 'Web Performance 101',
    description: 'A comprehencive guide into modern loading performance',
    isPopular: true,
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2018-08-10T12:00:00.000Z',
    link: 'https://iamakulov.com/notes/optimize-images-webpack/',
    title: 'How to optimize images in webpack',
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2019-06-11T14:00:00',
    link: '/blog/perf-for-startups/',
    title: 'Quick apps in 3 steps',
    description: 'Want to get faster with a minimal effort? Do this.',
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2018-04-18T12:00:00.000Z',
    link: 'https://iamakulov.com/notes/caching/',
    title: 'Short basics of caching',
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2021-04-01T12:55:00.211Z',
    link: 'https://twitter.com/iamakulov/status/1377605414779510784',
    title: 'Tips to improve Cumulative Layout Shift',
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2020-10-05T23:21:48.465Z',
    link: 'https://twitter.com/iamakulov/status/1313258115152912385',
    title: '6 ways to optimize third parties',
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2019-03-18T20:00:00',
    link: '/blog/link-rels/',
    title: 'Preload, prefetch and other <link> tags',
    isPopular: true,
  },
  {
    section: 'loadingAndImages',
    imageKey: 'polyfills',
    publishedAt: '2020-02-13T19:00:00',
    link: '/blog/polyfills/',
    title: 'How to load polyfills only when needed',
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2020-06-24T12:34:00.947Z',
    link: 'https://twitter.com/iamakulov/status/1275769142809944064',
    title: '1 💟 = 1 web perf tip',
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2021-07-26T14:00:04.779Z',
    link: 'https://twitter.com/iamakulov/status/1419658784134234112',
    title: (
      <>
        Antipattern: <code>&lt;link rel=&quot;preload&quot;&gt;</code> and fonts
      </>
    ),
  },
  {
    section: 'loadingAndImages',
    publishedAt: '2018-09-01T12:00:00.000Z',
    link: 'https://googlefonts.3perf.com/',
    title: 'Google Fonts optimizer',
    description:
      'A 550-byte script to make your Google Fonts render 1-3 seconds faster',
  },
  // Bundles — webpack, bundle size, libraries in the graph
  {
    section: 'bundles',
    publishedAt: '2018-06-01T12:00:00.000Z',
    link: 'https://developers.google.com/web/fundamentals/performance/webpack/',
    title: 'Optimizing web performance in webpack',
    description:
      'Guide for Google’s Web Fundamentals, together with Addy Osmani',
  },
  {
    section: 'bundles',
    publishedAt: '2020-05-18T14:37:33.281Z',
    link: 'https://twitter.com/iamakulov/status/1262391881364897796',
    title: 'How to remove bundle duplicates',
  },
  {
    section: 'bundles',
    imageKey: 'webpackLibs',
    publishedAt: '2019-11-01T12:00:00.000Z',
    link: 'https://github.com/GoogleChromeLabs/webpack-libs-optimizations',
    title: 'webpack-libs-optimizations',
    description: (
      <>
        Performance tips &amp; tricks for popular JS libraries. Created in
        collaboration with the Google Chrome team
        <BadgeImage src="https://img.shields.io/github/stars/GoogleChromeLabs/webpack-libs-optimizations" />
      </>
    ),
  },
  {
    section: 'bundles',
    publishedAt: '2018-05-01T12:00:00.000Z',
    link: 'https://github.com/iamakulov/awesome-webpack-perf',
    title: 'awesome-webpack-perf',
    description: (
      <>
        A curated list of webpack tools for web performance
        <BadgeImage src="https://img.shields.io/github/stars/iamakulov/awesome-webpack-perf" />
      </>
    ),
  },
  {
    section: 'bundles',
    imageKey: 'reexports',
    publishedAt: '2020-11-25T10:52:35.814Z',
    link: 'https://twitter.com/iamakulov/status/1331551351214645251',
    title: 'Why reexports are bad for performance',
  },
  {
    section: 'bundles',
    publishedAt: '2021-01-25T10:27:09.395Z',
    link: 'https://twitter.com/iamakulov/status/1353650608750825472',
    title: <code>/&#42;#__PURE__*/</code>,
    description:
      'What it is and why it’s in every JS bundle – even though you likely never heard of it',
  },
  {
    section: 'bundles',
    publishedAt: '2018-07-15T12:00:00.000Z',
    link: 'https://www.npmjs.com/package/moment-locales-webpack-plugin',
    title: 'moment-locales-webpack-plugin',
    description: (
      <>
        A webpack plugin that removes unused Moment locales and makes the bundle
        hundreds of KBs smaller
        <BadgeImage src="https://img.shields.io/npm/dw/moment-locales-webpack-plugin.svg" />
      </>
    ),
  },
  // React & runtime — components, scheduling, interactions
  {
    section: 'reactRuntime',
    imageKey: 'reactConcurrency',
    publishedAt: '2022-09-29T00:00:00.000Z',
    link: '/talks/react-concurrency/',
    title: 'React Concurrency, Explained',
    isPopular: true,
  },
  {
    section: 'reactRuntime',
    publishedAt: '2019-11-08T12:00:00.000Z',
    link: 'https://iamakulov.com/notes/resize-scroll/',
    title: 'How to optimize resizing or scrolling',
  },
  {
    section: 'reactRuntime',
    publishedAt: '2022-06-06T15:00:00',
    link: '/blog/react-monitoring/',
    title: 'How to monitor React render performance',
    description:
      'So you just made your app fast. Now, how do you ensure it doesn’t get slow again?',
    isPopular: true,
  },
  {
    section: 'reactRuntime',
    publishedAt: '2021-02-18T13:43:58.966Z',
    link: 'https://twitter.com/iamakulov/status/1362397450456154114',
    title: 'How to find and fix unnecessary React rerenders',
  },
  {
    section: 'reactRuntime',
    publishedAt: '2021-04-22T13:55:01.450Z',
    link: 'https://twitter.com/iamakulov/status/1385230664648253443',
    title: 'Antipattern: objects in React contexts',
  },
  // Tooling — Lighthouse, DevTools, lab vs field, archives
  {
    section: 'tooling',
    publishedAt: '2020-03-30T23:04:42.581Z',
    link: 'https://twitter.com/iamakulov/status/1244762505685225472',
    title: 'How PerfPerfPerf’s site got to 100 in PageSpeed Insights',
    description: 'Spoiler alert: no client-side JavaScript',
  },
  {
    section: 'tooling',
    publishedAt: '2026-04-14T00:00:00Z',
    link: '/blog/chrome-throttling/',
    title: 'Chrome DevTools Throttling Is Not Accurate',
    description:
      'Chrome DevTools slows down requests, not packets. This means its throttling is often off.',
    badge: 'New',
  },
  {
    section: 'tooling',
    publishedAt: '2025-06-12T08:33:12.000Z',
    link: 'https://github.com/GoogleChrome/lighthouse/issues/16539',
    title: 'Lighthouse punishes good asset preloading',
    description: 'Why Lighthouse gives bad scores even when a site is fast',
    isPopular: true,
  },
  {
    section: 'tooling',
    publishedAt: '2021-03-10T12:00:00.000Z',
    link: 'https://github.com/iamakulov/devtools-perf-features',
    title: 'devtools-perf-features',
    description: (
      <>
        Chrome DevTools’ little known features for performance debugging
        <BadgeImage src="https://img.shields.io/github/stars/iamakulov/devtools-perf-features" />
      </>
    ),
  },
  {
    section: 'tooling',
    publishedAt: '2021-03-18T14:55:00.342Z',
    link: 'https://twitter.com/iamakulov/status/1372562184199364614',
    title: 'PerfPerfPerf’s favorite tools',
    description: (
      <>
        <em>Non-webpack</em> tools for web performance
      </>
    ),
  },
  {
    section: 'tooling',
    imageKey: 'packer',
    publishedAt: '2025-03-23T20:00:00',
    link: '/blog/packer/',
    title: 'Performance archaeology: Packer.js, a JS minifier from 2004',
  },
];

const HOME_CONTENT_BY_YEAR: { year: number; items: HomeContentItem[] }[] = [];

for (const item of [...HOME_CONTENT].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
)) {
  const year = new Date(item.publishedAt).getFullYear();
  if (!Number.isFinite(year)) {
    throw new Error(`Invalid publishedAt value: ${item.publishedAt}`);
  }
  const last = HOME_CONTENT_BY_YEAR[HOME_CONTENT_BY_YEAR.length - 1];
  if (!last || last.year !== year) {
    HOME_CONTENT_BY_YEAR.push({ year, items: [item] });
  } else {
    last.items.push(item);
  }
}

interface ContentItemProps {
  image?: GraphqlImage;
  title: string | JSXChildrenProp;
  description?: string | JSXChildrenProp;
  badge?: string | JSXChildrenProp;
  link: string;
  isPopular?: boolean;
  sectionLabel?: string;
}

const ContentItem = ({
  image,
  title,
  description,
  link,
  badge,
  isPopular,
  sectionLabel,
}: ContentItemProps) => {
  const imageBlock = image && (
    <ItemImage $belowTitle={Boolean(sectionLabel)}>
      <GatsbyImage imageData={image.childImageSharp.gatsbyImageData} />
    </ItemImage>
  );
  const categoryBlock = sectionLabel && (
    <ItemSectionLabel>{sectionLabel}</ItemSectionLabel>
  );
  const titleBlock = (
    <div>
      <ItemTitle>{title}</ItemTitle>
      &nbsp;
      {badge && <Badge>{badge}</Badge>}
      {isPopular && '★'}
    </div>
  );

  return (
    <ItemLink href={link}>
      {sectionLabel ? (
        <>
          {categoryBlock}
          {titleBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {titleBlock}
        </>
      )}
      {description && <ItemDescription>{description}</ItemDescription>}
    </ItemLink>
  );
};

export function Head() {
  return (
    <>
      <title>Web Performance Talks, Articles and Tools | PerfPerfPerf</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="og:image" content={facebookCoverUrl} />
    </>
  );
}

const ContentPage = ({ data }: ContentPageProps) => {
  return (
    <Background>
      <Layout>
        <WidthWrapper>
          <Nav
            navKind={NavKind.Light}
            logoKind={LogoKind.White}
            logoLinksToHome={false}
            isLogoPlayful={true}
          />
          <Header>Web Performance, Explained</Header>
          <p>
            React and Core Web Vitals writing from{' '}
            <NameLink href="https://iamakulov.com">
              <AvatarImage
                imageData={data.photo.childImageSharp.gatsbyImageData}
                alt=""
              />{' '}
              <Name>Ivan Akulov</Name>
            </NameLink>
            , a web performance engineer and a Google Developer Expert.
          </p>
          <p>
            Backed by <Suspense>{new Date().getFullYear() - 2017}</Suspense>{' '}
            years of doing performance work with Framer, Polymarket, Google, and
            many more companies.
          </p>
          <SortSwitcher>
            <SortLegend>Sort homepage by category or date</SortLegend>
            <SortInput
              id="sort-content"
              name="homepage-sort"
              defaultChecked={true}
            />
            <SortInput id="sort-date" name="homepage-sort" />
            <SortPills>
              <SortPill htmlFor="sort-content">
                <SortPillShape kind="content" />
                <span>By category</span>
              </SortPill>
              <SortPill htmlFor="sort-date">
                <SortPillShape kind="date" />
                <span>By date</span>
              </SortPill>
            </SortPills>
            <div data-sort-view="content">
              {SECTION_ORDER.map((sectionId) => (
                <div key={sectionId}>
                  <SectionHeader>{SECTION_HEADINGS[sectionId]}</SectionHeader>
                  <Section>
                    {HOME_CONTENT.filter(
                      (item) => item.section === sectionId,
                    ).map((item) => (
                      <ContentItem
                        key={item.link}
                        image={item.imageKey ? data[item.imageKey] : undefined}
                        link={item.link}
                        title={item.title}
                        description={item.description}
                        badge={item.badge}
                        isPopular={item.isPopular}
                      />
                    ))}
                  </Section>
                </div>
              ))}
            </div>
            <SectionDateView data-sort-view="date">
              {HOME_CONTENT_BY_YEAR.map(({ year, items }) => (
                <Fragment key={year}>
                  <DateYearHeader>{year}</DateYearHeader>
                  {items.map((item) => (
                    <ContentItem
                      key={item.link}
                      image={item.imageKey ? data[item.imageKey] : undefined}
                      link={item.link}
                      title={item.title}
                      description={item.description}
                      isPopular={item.isPopular}
                      sectionLabel={SECTION_HEADINGS[item.section]}
                    />
                  ))}
                </Fragment>
              ))}
            </SectionDateView>
          </SortSwitcher>
          <MailchimpSubscribe text="Performance articles, case studies, and more. An email every once in a while:" />
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
    webPerf101: file(relativePath: { eq: "talks/web-perf-101/cover.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    notion: file(relativePath: { eq: "notion-social.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    packer: file(relativePath: { eq: "packer/cover-facebook.jpg" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    webpackLibs: file(relativePath: { eq: "webpack-libs.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    reexports: file(relativePath: { eq: "reexports.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    polyfills: file(relativePath: { eq: "polyfills.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    awesomeWebpackPerf: file(relativePath: { eq: "awesome-webpack-perf.png" }) {
      childImageSharp {
        gatsbyImageData(height: 150, placeholder: NONE, layout: FIXED)
      }
    }
    photo: file(relativePath: { eq: "photo.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 24, height: 24, layout: FIXED, placeholder: NONE)
      }
    }
  }
`;
