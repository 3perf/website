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
  Blockquote,
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
    workshopDesktop: GraphqlImage;
    workshopMobile: GraphqlImage;
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
        <Blockquote>
          <p>
            I want to marry that audit document ❤️ the level of detail,
            including going through our own codebase and pin-pointing where
            exactly improvements need to happen, it’s just... wow
          </p>
          <footer>
            <a href="https://twitter.com/heypiotr">Piotr Krawiec</a>, Product
            Engineer @ Framer
          </footer>
        </Blockquote>
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
    <ImageText
      direction="forward"
      desktopImageHeight={
        data.workshopDesktop.childImageSharp.gatsbyImageData.height
      }
    >
      <MobileImageWrapper>
        <MobileImage
          imageData={data.workshopMobile.childImageSharp.gatsbyImageData}
        />
      </MobileImageWrapper>
      <DesktopImage
        imageData={data.workshopDesktop.childImageSharp.gatsbyImageData}
      />
      <Text>
        <H3>Training&nbsp;🧑‍💻</H3>
        <p>
          <strong>What:</strong> we’ll teach your team everything we know about
          React performance or Core Web Vitals. We’ll take a slow site, figure
          out what makes it slow, and gradually fix every performance issue we
          encounter.
        </p>
        <p>
          <strong>Great when:</strong> you want a foundation to make sure{' '}
          <em>your team</em> knows how to keep you fast.
        </p>
        <Note>
          <p>
            Fully online&nbsp;· For either Junior or Senior engineers&nbsp;·
            Takes 12-16 hours
          </p>
          <p>
            Attendee feedback (as of Dec 2021): 31.8% of all responders so far
            answered the workshop was “even better than expected”
          </p>
        </Note>
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
        workshopDesktop: file(
          relativePath: { eq: "HomeSectionServices/workshop-desktop.png" }
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
        workshopMobile: file(
          relativePath: { eq: "HomeSectionServices/workshop-mobile.png" }
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
