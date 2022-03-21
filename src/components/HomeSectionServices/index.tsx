import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import { GraphqlImageFixed } from '../../types';
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
  BlockquoteFooter,
  BlockquoteImage,
  BlockquoteName,
  BlockquoteTextWrapper,
} from './styled';

interface ServicesSectionProps {
  className?: string;
  data: {
    auditDesktop: GraphqlImageFixed & {
      childImageSharp: { fixed: { height: number } };
    };
    optimizationDesktop: GraphqlImageFixed & {
      childImageSharp: { fixed: { height: number } };
    };
    workshopDesktop: GraphqlImageFixed & {
      childImageSharp: { fixed: { height: number } };
    };
    davidAvatar: GraphqlImageFixed;
    piotrAvatar: GraphqlImageFixed;
    auditMobile: GraphqlImageFixed;
    optimizationMobile: GraphqlImageFixed;
    workshopMobile: GraphqlImageFixed;
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
      desktopImageHeight={data.auditDesktop.childImageSharp.fixed.height}
    >
      <MobileImageWrapper>
        <MobileImage imageData={data.auditMobile.childImageSharp.fixed} />
      </MobileImageWrapper>
      <DesktopImage imageData={data.auditDesktop.childImageSharp.fixed} />
      <Text>
        <H3>Find What To Improve&nbsp;🔬</H3>
        <p>
          <strong>What:</strong> we’ll analyze the site, identify all
          performance issues, and tell you which ones matter the most &amp; how
          to fix them.
        </p>
        <p>
          <strong>Great when:</strong> you want to learn how to improve your
          Core Web Vitals, conversion, or user experience.
        </p>
        <Blockquote>
          <BlockquoteTextWrapper>
            <p>
              I want to marry that audit document! The level of detail,
              including going through our own codebase and pin-pointing where
              exactly improvements need to happen, it’s just... wow
            </p>
          </BlockquoteTextWrapper>
          <BlockquoteFooter>
            <BlockquoteImage
              imageData={data.piotrAvatar.childImageSharp.fixed}
              alt=""
            />
            <BlockquoteName>Piotr Krawiec</BlockquoteName> · Product Engineer @
            Framer
          </BlockquoteFooter>
        </Blockquote>
        <Note>
          <strong>Want an example?</strong> See this{' '}
          <a href="/blog/notion/">public Notion case study</a>.
        </Note>
      </Text>
    </ImageText>
    <ImageText
      direction="reverse"
      desktopImageHeight={data.optimizationDesktop.childImageSharp.fixed.height}
    >
      <MobileImageWrapper>
        <MobileImage
          imageData={data.optimizationMobile.childImageSharp.fixed}
        />
      </MobileImageWrapper>
      <DesktopImage
        imageData={data.optimizationDesktop.childImageSharp.fixed}
      />
      <Text>
        <H3>Optimize the App&nbsp;🛠</H3>
        <p>
          <strong>What:</strong> we’ll join your project, roll up our sleeves,
          find all performance bottlenecks, and apply precise optimizations –
          all by ourselves.
        </p>
        <p>
          <strong>Great when:</strong> you don’t want to distract the team from
          delivering business functionality.
        </p>
        <Blockquote>
          <BlockquoteTextWrapper>
            <p>
              In just a couple weeks, Ivan significantly improved runtime
              performance and tree shaking of our key components. One of our
              products’ bundle got 3 times smaller – with 10× less JS needed for
              the initial load!
            </p>
          </BlockquoteTextWrapper>
          <BlockquoteFooter>
            <BlockquoteImage
              imageData={data.davidAvatar.childImageSharp.fixed}
              alt=""
            />
            <BlockquoteName>David Sigley</BlockquoteName> · Head of Engineering
            @ Castor
          </BlockquoteFooter>
        </Blockquote>
      </Text>
    </ImageText>
    <ImageText
      direction="forward"
      desktopImageHeight={data.workshopDesktop.childImageSharp.fixed.height}
    >
      <MobileImageWrapper>
        <MobileImage imageData={data.workshopMobile.childImageSharp.fixed} />
      </MobileImageWrapper>
      <DesktopImage imageData={data.workshopDesktop.childImageSharp.fixed} />
      <Text>
        <H3>Grow The Team&nbsp;🧑‍💻</H3>
        <p>
          <strong>What:</strong> we’ll teach your team everything we know about
          React performance or Core Web Vitals. We’ll take a bunch of slow
          sites, figure out what makes them slow, and gradually fix every
          performance issue we encounter.
        </p>
        <p>
          <strong>Great when:</strong> your team needs to learn how to keep you
          fast on their own.
        </p>
        <Note>
          <strong>Format:</strong> Online or offline&nbsp;· For either Junior or
          Senior engineers&nbsp;· Takes 12-16 hours
        </Note>
        <Note>
          <strong>32% of all respondents</strong> so far told the workshop was
          “even better than expected”
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
        <H3>Something Else&nbsp;🎁</H3>
        <p>
          Want something custom? We’ll be glad to help. Reach us, and let’s
          figure out how our experience can be relevant.
        </p>
      </Column>
    </Columns>
    <ActionButton href="#contact">Get a quote</ActionButton>
  </Section>
);

const ServicesSectionWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        auditDesktop: file(
          relativePath: { eq: "HomeSectionServices/audit-desktop.png" }
        ) {
          childImageSharp {
            fixed(width: 900) {
              ...ImageFixed
              height
            }
          }
        }

        optimizationDesktop: file(
          relativePath: { eq: "HomeSectionServices/optimization-desktop.png" }
        ) {
          childImageSharp {
            fixed(width: 900) {
              ...ImageFixed
              height
            }
          }
        }

        workshopDesktop: file(
          relativePath: { eq: "HomeSectionServices/workshop-desktop.png" }
        ) {
          childImageSharp {
            fixed(width: 900) {
              ...ImageFixed
              height
            }
          }
        }

        auditMobile: file(
          relativePath: { eq: "HomeSectionServices/audit-mobile.png" }
        ) {
          childImageSharp {
            fixed(width: 224) {
              ...ImageFixed
            }
          }
        }

        optimizationMobile: file(
          relativePath: { eq: "HomeSectionServices/optimization-mobile.png" }
        ) {
          childImageSharp {
            fixed(width: 224) {
              ...ImageFixed
            }
          }
        }

        workshopMobile: file(
          relativePath: { eq: "HomeSectionServices/workshop-mobile.png" }
        ) {
          childImageSharp {
            fixed(width: 224) {
              ...ImageFixed
            }
          }
        }

        davidAvatar: file(
          relativePath: { eq: "HomeSectionServices/david.jpg" }
        ) {
          childImageSharp {
            fixed(width: 20) {
              ...ImageFixed
            }
          }
        }

        piotrAvatar: file(
          relativePath: { eq: "HomeSectionServices/piotr.jpg" }
        ) {
          childImageSharp {
            fixed(width: 20) {
              ...ImageFixed
            }
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
