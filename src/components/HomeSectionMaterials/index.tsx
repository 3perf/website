import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import { SharpImageFluid } from '../../types';
import HomeLeftRightWrapper from '../HomeLeftRightWrapper';
import Link from '../Link';
import Section, { SectionKind } from '../Section';
import {
  Image,
  LinkWrapper,
  LinkBlock,
  LinkDescription,
  LinkText,
  PrimaryArticle,
  Wrapper,
  OtherArticles,
} from './styled';

interface MaterialsSectionData {
  webPerf101: SharpImageFluid;
}

interface MaterialsSectionProps {
  data: MaterialsSectionData;
}

const MaterialsSection = ({ data }: MaterialsSectionProps) => (
  <Section title="Articles" sectionKind={SectionKind.VERTICAL}>
    <HomeLeftRightWrapper
      left={
        <LinkBlock href="/talks/web-perf-101">
          <Image fluid={data.webPerf101.childImageSharp.fluid} />
          <LinkText>Web Performance 101</LinkText>
          <LinkDescription>
            A comprehensive guide into modern web performance
          </LinkDescription>
        </LinkBlock>
      }
      right={
        <>
          <LinkWrapper>
            <Link href="/blog/notion">
              Case study: Analyzing Notion app performance
            </Link>
            <LinkDescription>
              How to make a React app load ~30% faster – by tuning some configs
              and delaying some scripts
            </LinkDescription>
          </LinkWrapper>
          <LinkWrapper>
            <Link href="/blog/link-rels/">
              Preload, prefetch and other &lt;link&gt; tags
            </Link>
            <LinkDescription>
              HTML has as much as 5 different tags to preload something. This is
              a detailed deep-dive into each of them
            </LinkDescription>
          </LinkWrapper>
          <LinkWrapper>
            <Link href="/blog/polyfills/">
              How to load polyfills only when needed
            </Link>
            <LinkDescription>
              We’ve been asked: “These days, how do you typically serve
              polyfills only to browsers that need them?”
            </LinkDescription>
          </LinkWrapper>
          <LinkWrapper>
            <Link href="/content">More →</Link>
          </LinkWrapper>
        </>
      }
    />
  </Section>
);

const MaterialsSectionWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        webPerf101: file(
          relativePath: { eq: "HomeSectionMaterials/web-perf-101.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={(data) => <MaterialsSection data={data} />}
  />
);

export default MaterialsSectionWithQuery;
