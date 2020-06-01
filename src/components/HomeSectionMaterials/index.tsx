import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import { SharpImageFixed } from '../../types';
import Link from '../Link';
import Section, { SectionKind } from '../Section';
import { Image, Links, LinkWrapper, Text } from './styled';

interface MaterialsSectionData {
  googleWebpack: SharpImageFixed;
  polished: SharpImageFixed;
  webPerf101: SharpImageFixed;
}

interface MaterialsSectionProps {
  data: MaterialsSectionData;
}

const MaterialsSection = ({ data }: MaterialsSectionProps) => (
  <Section title="Articles" sectionKind={SectionKind.VERTICAL}>
    <Text>We write stuff:</Text>
    <Links>
      <LinkWrapper>
        <Link href="/talks/web-perf-101">
          <Image fixed={data.webPerf101.childImageSharp.fixed} />
          Web performance 101
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link href="https://iamakulov.com/notes/walmart/">
          Case study: analyzing the Walmart site performance
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link href="https://iamakulov.com/notes/optimize-images-webpack/">
          How to optimize images in webpack
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link href="https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size">
          <Image
            fixed={data.googleWebpack.childImageSharp.fixed}
            addBorder={true}
          />
          Web performance guide for webpack
        </Link>
      </LinkWrapper>
    </Links>
    <Text>And do stuff:</Text>
    <Links>
      <LinkWrapper>
        <Link href="https://googlefonts.3perf.com">Google Fonts Optimizer</Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link href="https://www.npmjs.com/package/moment-locales-webpack-plugin">
          moment-locales-webpack-plugin
        </Link>
      </LinkWrapper>
    </Links>
    <Link href="/content">See more →</Link>
  </Section>
);

const MaterialsSectionWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        googleWebpack: file(
          relativePath: { eq: "HomeSectionMaterials/google-webpack.png" }
        ) {
          childImageSharp {
            fixed(height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        polished: file(
          relativePath: { eq: "HomeSectionMaterials/polished.png" }
        ) {
          childImageSharp {
            fixed(height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        webPerf101: file(
          relativePath: { eq: "HomeSectionMaterials/web-perf-101.png" }
        ) {
          childImageSharp {
            fixed(height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data) => <MaterialsSection data={data} />}
  />
);

export default MaterialsSectionWithQuery;
