import { graphql } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import AboutSection from '../components/HomeSectionAbout';
import ClientsSection from '../components/HomeSectionClients';
import MaterialsSection from '../components/HomeSectionMaterials';
import ServicesSection from '../components/HomeSectionServices';
import HomeSectionTestimonials from '../components/HomeSectionTestimonials';
import Layout from '../components/Layout';
import { LogoKind } from '../components/Logo';
import { NavKind } from '../components/NavBase';
import WidthWrapper from '../components/WidthWrapper';
import {
  ActionButton,
  FooterWrapper,
  ContactSection,
  Header,
  HeaderBackground,
  H1,
  Nav,
  NewArticleBackground,
  NewArticleLink,
  SectionWrapper,
  ServicesBackground,
  IndexPageGlobalStyles,
  Mark,
} from './index.styled';

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            fields: {
              slug: string;
            };
            frontmatter: {
              title: {
                visible: string;
              };
            };
          };
        },
      ];
    };
  };
}

const IndexPage = ({ data }: IndexPageProps) => (
  <Layout>
    <IndexPageGlobalStyles />
    <Helmet>
      <title>PerfPerfPerf · Web performance consulting</title>
      <meta
        name="description"
        content="We help companies to make their web apps faster and increase their revenue. We worked with Google, Framer, Common, CMTT and others"
      />
      <meta
        name="keywords"
        content="perf perf perf, performance, performance consulting, performance optimization, performance agency, performance company, web performance, web performance optimization, web performance consulting, react performance consulting, react performance optimization"
      />
    </Helmet>
    <HeaderBackground>
      <WidthWrapper>
        <Nav
          logoKind={LogoKind.White}
          logoLinksToHome={false}
          isLogoPlayful={true}
          navKind={NavKind.Light}
        />
        <Header>
          <H1>
            <Mark>Get your site blazingly fast</Mark>
          </H1>
        </Header>
        <ActionButton kind="light" href="#contact">
          Get a quote
        </ActionButton>
      </WidthWrapper>
      <NewArticleBackground>
        <WidthWrapper>
          <strong>New article:</strong>{' '}
          <NewArticleLink
            href={data.allMarkdownRemark.edges[0].node.fields.slug}
          >
            {data.allMarkdownRemark.edges[0].node.frontmatter.title}
          </NewArticleLink>
        </WidthWrapper>
      </NewArticleBackground>
    </HeaderBackground>
    <div>
      <WidthWrapper>
        <SectionWrapper id="testimonials">
          <HomeSectionTestimonials />
        </SectionWrapper>
      </WidthWrapper>
      <SectionWrapper>
        <ServicesBackground>
          <WidthWrapper id="services">
            <ServicesSection />
          </WidthWrapper>
        </ServicesBackground>
      </SectionWrapper>
      <WidthWrapper>
        <SectionWrapper id="materials">
          <MaterialsSection />
        </SectionWrapper>
        <SectionWrapper id="clients">
          <ClientsSection />
        </SectionWrapper>
        <SectionWrapper id="about">
          <AboutSection />
        </SectionWrapper>
        <SectionWrapper id="contact" marginBottom={0}>
          <ContactSection />
        </SectionWrapper>
        <FooterWrapper>
          <Footer linkToHome={false} license={false} />
        </FooterWrapper>
      </WidthWrapper>
    </div>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  # Retrieve the latest article
  query {
    allMarkdownRemark(
      filter: { fields: { slug: {}, sourceName: { eq: "blog" } } }
      sort: { fields: frontmatter___date___published, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
