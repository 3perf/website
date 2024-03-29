import { graphql, useStaticQuery } from 'gatsby';
import { GraphqlImage } from '../../types';
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
  talkImage: GraphqlImage;
}

interface AboutSectionProps {
  data: AboutSectionData;
}

const AboutSection = ({ data }: AboutSectionProps) => (
  <Section title="About Us" sectionKind={SectionKind.VERTICAL}>
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
        <Image imageData={data.talkImage.childImageSharp.gatsbyImageData} />
      </Primary>
      <Links>
        <LinkWrapper>
          <Link href="https://twitter.com/iamakulov">Twitter</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="https://github.com/iamakulov">Open-source work</Link>
        </LinkWrapper>
        <Factoid>
          <Number>400K</Number> reads of Ivan’s perf guides
        </Factoid>
      </Links>
    </Wrapper>
  </Section>
);

const AboutSectionWithQuery = () => {
  const data: AboutSectionData = useStaticQuery(graphql`
    {
      talkImage: file(
        relativePath: { eq: "HomeSectionAbout/talk_cropped.jpg" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 727, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);
  return <AboutSection data={data} />;
};

export default AboutSectionWithQuery;
