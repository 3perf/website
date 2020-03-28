import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import { SharpImageFixed } from '../../types';
import Section, { SectionKind } from '../Section';
import { Intro, Name, PeopleList, Person, Photo, Username } from './styled';

interface AboutSectionData {
  iamakulov: SharpImageFixed;
  kurtextrem: SharpImageFixed;
}

interface AboutSectionProps {
  data: AboutSectionData;
}

const AboutSection = ({ data }: AboutSectionProps) => (
  <Section title="About us" sectionKind={SectionKind.VERTICAL}>
    <Intro>We’re a team of two people:</Intro>

    <PeopleList>
      <Person href="https://twitter.com/iamakulov">
        <Photo fixed={data.iamakulov.childImageSharp.fixed} />
        <Name>Ivan Akulov</Name>
        <Username>@iamakulov</Username>
      </Person>

      <Person href="https://twitter.com/kurtextrem">
        <Photo fixed={data.kurtextrem.childImageSharp.fixed} />
        <Name>Jacob Groß</Name>
        <Username>@kurtextrem</Username>
      </Person>
    </PeopleList>
  </Section>
);

const AboutSectionWithQuery = () => (
  <StaticQuery
    query={graphql`
      fragment AboutImage on File {
        childImageSharp {
          fixed(width: 80, height: 80, quality: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      query {
        iamakulov: file(
          relativePath: { eq: "HomeSectionAbout/iamakulov.jpg" }
        ) {
          ...AboutImage
        }

        kurtextrem: file(
          relativePath: { eq: "HomeSectionAbout/kurtextrem.jpg" }
        ) {
          ...AboutImage
        }
      }
    `}
    render={data => <AboutSection data={data} />}
  />
);

export default AboutSectionWithQuery;
