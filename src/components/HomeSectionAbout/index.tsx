import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import { GraphqlImageFluid } from '../../types';
import Section, { SectionKind } from '../Section';
import {
  Intro,
  Image,
  Link,
  LinkWrapper,
  Primary,
  Links,
  Wrapper,
  Factoid,
  Number,
} from './styled';

interface AboutSectionData {
  talkImage: GraphqlImageFluid;
}

interface AboutSectionProps {
  data: AboutSectionData;
}

const AboutSection = ({ data }: AboutSectionProps) => (
  <Section title="About us" sectionKind={SectionKind.VERTICAL}>
    <Wrapper>
      <Primary>
        <Intro>
          PerfPerfPerf is ran by{' '}
          <a href="http://twitter.com/iamakulov">Ivan Akulov</a>, a{' '}
          <a href="https://developers.google.com/community/experts/directory">
            Google Developer Expert
          </a>
          , an <a href="https://iamakulov.com/#talks">international speaker</a>,
          and a web performance consultant.
        </Intro>
        <Image imageData={data.talkImage.childImageSharp.fluid} />
      </Primary>
      <Links>
        <LinkWrapper>
          <Link href="https://twitter.com/iamakulov">Twitter</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="https://github.com/iamakulov">Open-source work</Link>
        </LinkWrapper>
        <Factoid>
          <Number>200K</Number> reads of Ivan’s perf content
        </Factoid>
      </Links>
    </Wrapper>
  </Section>
);

const AboutSectionWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        talkImage: file(
          relativePath: { eq: "HomeSectionAbout/talk_cropped.jpg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 727) {
              ...ImageFluid
            }
          }
        }
      }
    `}
    render={(data) => <AboutSection data={data} />}
  />
);

export default AboutSectionWithQuery;
