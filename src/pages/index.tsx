import * as React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import AboutSection from '../components/HomeSectionAbout';
import ClientsSection from '../components/HomeSectionClients';
import MaterialsSection from '../components/HomeSectionMaterials';
import PerfConversionSection from '../components/HomeSectionPerfConversion';
import ServicesSection from '../components/HomeSectionServices';
import HomeSectionTestimonials from '../components/HomeSectionTestimonials';
import Layout from '../components/Layout';
import { LogoKind } from '../components/Logo';
import { NavKind } from '../components/NavBase';
import WidthWrapper from '../components/WidthWrapper';
import {
  ActionButton,
  ColumnSectionWrapper,
  ColumnsWrapper,
  FooterWrapper,
  ContactSection,
  Content,
  Header,
  HeaderBackground,
  H1,
  Nav,
  SectionWrapper,
  ServicesBackground,
} from './index.styled';

const IndexPage = () => (
  <Layout>
    <Helmet>
      <title>PerfPerfPerf · Web performance consulting</title>
      <meta
        name="description"
        content="We’re helping companies to earn more by making web apps faster. We worked with Google, Framer, Common, CMTT and others"
      />
      <meta
        name="keywords"
        content="perf perf perf, performance, performance consulting, performance optimization, performance agency, performance company, web performance, web performance optimization, web performance consulting"
      />
    </Helmet>
    <Content>
      <HeaderBackground>
        <WidthWrapper>
          <Nav
            logoKind={LogoKind.White}
            logoLinksToHome={false}
            isLogoPlayful={true}
            navKind={NavKind.Light}
          />
          <Header>
            <H1>Make your web app faster → earn more</H1>
          </Header>
          <ActionButton kind="light" href="#contact">
            Chat with us
          </ActionButton>
        </WidthWrapper>
      </HeaderBackground>
      <div>
        <WidthWrapper>
          <SectionWrapper id="testimonials">
            <HomeSectionTestimonials />
          </SectionWrapper>
        </WidthWrapper>
        <WidthWrapper>
          <SectionWrapper id="why">
            <PerfConversionSection />
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
          <SectionWrapper id="clients">
            <ClientsSection />
          </SectionWrapper>
          <ColumnsWrapper>
            <ColumnSectionWrapper id="about">
              <AboutSection />
            </ColumnSectionWrapper>
            <ColumnSectionWrapper id="materials">
              <MaterialsSection />
            </ColumnSectionWrapper>
          </ColumnsWrapper>
          <SectionWrapper id="contact" marginBottom={0}>
            <ContactSection />
          </SectionWrapper>
          <FooterWrapper>
            <Footer
              linkToHome={false}
              license={false}
              showLegalDetails={true}
            />
          </FooterWrapper>
        </WidthWrapper>
      </div>
    </Content>
  </Layout>
);

export default IndexPage;
