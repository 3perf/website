import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import { SharpImageFixed } from '../../types';
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
        <Link to="/talks/web-perf-101">
          <Image fixed={data.webPerf101.childImageSharp.fixed} />
          Web performance 101
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <a href="https://iamakulov.com/notes/walmart/">
          Case study: analyzing the Walmart site performance
        </a>
      </LinkWrapper>
      <LinkWrapper>
        <a href="https://iamakulov.com/notes/optimize-images-webpack/">
          How to optimize images in webpack
        </a>
      </LinkWrapper>
      <LinkWrapper>
        <a href="https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size">
          <Image
            fixed={data.googleWebpack.childImageSharp.fixed}
            addBorder={true}
          />
          Web performance guide for webpack
        </a>
      </LinkWrapper>
    </Links>
    <Text>And do stuff:</Text>
    <Links>
      <LinkWrapper>
        <a href="https://googlefonts.3perf.com">Google Fonts Optimizer</a>
      </LinkWrapper>
      <LinkWrapper>
        <a href="https://www.npmjs.com/package/moment-locales-webpack-plugin">
          moment-locales-webpack-plugin
        </a>
      </LinkWrapper>
    </Links>
    <Link to="/content">See more →</Link>
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
    render={data => <MaterialsSection data={data} />}
  />
);

export default MaterialsSectionWithQuery;
