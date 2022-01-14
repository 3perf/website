import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import { GraphqlImage } from '../../types';
import { SectionKind } from '../Section';
import {
  ActionButton,
  Column,
  ImageText,
  DesktopImage,
  MobileImageWrapper,
  MobileImage,
  Note,
  Text,
  Columns,
  H3,
  Section,
  SvgMask,
} from './styled';

interface ServicesSectionProps {
  className?: string;
  data: {
    auditDesktop: GraphqlImage & {
      childImageSharp: { gatsbyImageData: { height: number } };
    };
    optimizationDesktop: GraphqlImage & {
      childImageSharp: { gatsbyImageData: { height: number } };
    };
    auditMobile: GraphqlImage;
    optimizationMobile: GraphqlImage;
  };
}

const ServicesSection = ({ className = '', data }: ServicesSectionProps) => (
  <Section
    title="Let’s make you fast&nbsp;🚀"
    className={className}
    sectionKind={SectionKind.VERTICAL}
  >
    <SvgMask>
      <clipPath id="serviceMobileMask">
        <path d="M0 112C0 0.139999 0.139999 0 112 0C223.86 0 224 0.139999 224 112C224 223.86 223.86 224 112 224C0.139999 224 0 223.86 0 112Z"></path>
      </clipPath>
    </SvgMask>
    <ImageText
      direction="forward"
      desktopImageHeight={
        data.auditDesktop.childImageSharp.gatsbyImageData.height
      }
    >
      <MobileImageWrapper>
        <MobileImage
          imageData={data.auditMobile.childImageSharp.gatsbyImageData}
        />
      </MobileImageWrapper>
      <DesktopImage
        imageData={data.auditDesktop.childImageSharp.gatsbyImageData}
      />
      <Text>
        <H3>Audit&nbsp;🔬</H3>
        <p>
          <strong>What:</strong> we’ll analyze the site, identify all
          performance issues, and compose a document with potential
          op&shy;ti&shy;mi&shy;za&shy;tions.
        </p>
        <p>
          <strong>Great when:</strong> you have a team that wants to learn a lot
          about their website performance, and that is ready to implement all
          optimizations themselves.
        </p>
        <Note>
          <strong>Want an example?</strong> See this{' '}
          <a href="/blog/notion/">public Notion case study</a>.
        </Note>
      </Text>
    </ImageText>
    <ImageText
      direction="reverse"
      desktopImageHeight={
        data.optimizationDesktop.childImageSharp.gatsbyImageData.height
      }
    >
      <MobileImageWrapper>
        <MobileImage
          imageData={data.optimizationMobile.childImageSharp.gatsbyImageData}
        />
      </MobileImageWrapper>
      <DesktopImage
        imageData={data.optimizationDesktop.childImageSharp.gatsbyImageData}
      />
      <Text>
        <H3>Optimization&nbsp;🛠</H3>
        <p>
          <strong>What:</strong> we’ll join your project, roll up our sleeves,
          find all performance bottlenecks, and apply precise optimizations –
          all by ourselves.
        </p>
        <p>
          <strong>Great when:</strong> you don’t want to distract the team from
          delivering business functionality, and you want to make sure all
          quirks and implementation nuances are considered.
        </p>
      </Text>
    </ImageText>
    <Columns>
      <Column>
        <H3>Open Source&nbsp;💛</H3>
        <p>
          Are you a non-commercial open-source project? Our work wouldn’t be
          possible without open-source tools. Reach out, and, if we have
          capacity, we’ll be glad to help for free.
        </p>
      </Column>
      <Column>
        <H3>Something else&nbsp;🎁</H3>
        <p>
          Want something custom? We’ll be glad to chat. Reach us, and let’s
          figure out how we can help you.
        </p>
      </Column>
    </Columns>
    <ActionButton href="#contact">Chat with us</ActionButton>
  </Section>
);

const ServicesSectionWithQuery = () => (
  <StaticQuery
    query={graphql`
      {
        auditDesktop: file(
          relativePath: { eq: "HomeSectionServices/audit-desktop.png" }
        ) {
          childImageSharp {
            gatsbyImageData(width: 900, placeholder: NONE, layout: FIXED)
          }
        }
        optimizationDesktop: file(
          relativePath: { eq: "HomeSectionServices/optimization-desktop.png" }
        ) {
          childImageSharp {
            gatsbyImageData(width: 900, placeholder: NONE, layout: FIXED)
          }
        }
        auditMobile: file(
          relativePath: { eq: "HomeSectionServices/audit-mobile.png" }
        ) {
          childImageSharp {
            gatsbyImageData(width: 224, placeholder: NONE, layout: FIXED)
          }
        }
        optimizationMobile: file(
          relativePath: { eq: "HomeSectionServices/optimization-mobile.png" }
        ) {
          childImageSharp {
            gatsbyImageData(width: 224, placeholder: NONE, layout: FIXED)
          }
        }
      }
    `}
    render={(data: ServicesSectionProps['data']) => (
      <ServicesSection data={data} />
    )}
  />
);

export default ServicesSectionWithQuery;
