import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import WidthWrapper from '../../components/WidthWrapper';
import {
  Background,
  Container,
  Keywords,
  Footer,
  Header,
  MailchimpSubscribe,
  TextMaxWidthWrapper,
  FooterContainer,
  Nav,
  Marquee,
  FigureContainer,
} from './styled';
import Image from '../../components/Image';
import { graphql } from 'gatsby';
import { GraphqlImage } from '../../types';
import { styled } from 'styled-components';
import facebookCoverUrl from './conference.jpg';

export const Head = () => (
  <>
    <title>
      React Performance and Core Web Vitals Workshops | PerfPerfPerf
    </title>
    <meta
      name="description"
      content="Learn how to improve your React app performance and Core Web Vitals with these workshops."
    />
    <meta
      name="keywords"
      content="react performance workshop, core web vitals workshop, loading performance workshop, react interaction performance workshop, runtime react speed workshop"
    />
    <meta name="og:image" content={facebookCoverUrl} />
  </>
);

const PhotoImage = styled(Image)`
  border-radius: 4px;
  overflow: hidden;
`;

const WorkshopsPage = ({
  data,
}: {
  data: { conferenceImage: GraphqlImage; slidesImage: GraphqlImage };
}) => {
  return (
    <Layout>
      <Background>
        <Container>
          <WidthWrapper>
            <Nav logoKind={LogoKind.White} />
          </WidthWrapper>
          <Keywords>
            <Marquee duration={200}>
              <span>unnecessary renders</span> · <span>why-did-you-render</span>{' '}
              · <span>hydration cost</span> ·{' '}
              <span>expensive renders and effects</span> ·{' '}
              <span>react profiler</span> · <span>chrome devtools</span> ·&nbsp;
            </Marquee>
            <Marquee duration={200}>
              <span>suspense</span> · <span>redux & context</span> ·{' '}
              <span>react 18</span> · <span>layout thrashing</span> ·{' '}
              <span>browser’s render loop</span> · <span>virtualization</span>{' '}
              ·&nbsp;
            </Marquee>
            <Marquee duration={300}>
              <span>cdns</span> · <span>render-blocking resources</span> ·{' '}
              <span>critical css</span> · <span>webp and avif</span> ·{' '}
              <span>font subsetting</span> · <span>responsive images</span> ·{' '}
              <span>http2 & http3</span> · <span>hydration cost</span> ·&nbsp;
            </Marquee>
            <Marquee duration={300}>
              <span>third parties</span> · <span>cache-control</span> ·{' '}
              <span>webpagetest</span> · <span>staying fast</span> ·{' '}
              <span>prefetching</span> ·&nbsp;
            </Marquee>
          </Keywords>
          <WidthWrapper>
            <TextMaxWidthWrapper>
              <Header>Learn Web Per&shy;for&shy;mance First Hand</Header>
              <p>
                Since 2017,{' '}
                <a href="https://twitter.com/iamakulov" target="_blank">
                  Ivan Akulov
                </a>{' '}
                has been helping companies like Framer, Restream, Toggl, and
                dozens more to get their apps and sites faster. Over these
                years, Ivan developed a step-by-step methodology to improving
                web performance. Now, Ivan is teaching this methodology to other
                engineers.
              </p>
            </TextMaxWidthWrapper>
          </WidthWrapper>
          <FigureContainer>
            <figure>
              <PhotoImage
                imageData={data.conferenceImage.childImageSharp.gatsbyImageData}
              />
              <figcaption>
                This image is from a conference, not from a workshop – getting
                nice photos with mostly remote workshops is hard!
              </figcaption>
            </figure>
            <figure>
              <Image
                imageData={data.slidesImage.childImageSharp.gatsbyImageData}
              />
              <figcaption>
                Workshops typically have barely 15-20 slides – 90% of time is
                spent live coding and live debugging
              </figcaption>
            </figure>
          </FigureContainer>
          <WidthWrapper>
            <TextMaxWidthWrapper>
              <p>
                <strong>⚛️ React Performance Masterclass.</strong> In the React
                workshop, we take a slow app → profile it → fix it – and then
                repeat with the next app, over and over, until we learn every
                common React performance antipattern.
              </p>
              <p>
                The workshop covers both basic (<code>useMemo()</code>, Chrome
                DevTools, React Profiler) and advanced subjects (React Context,{' '}
                <code>why-did-you-render</code>, <code>useTransition</code>, and
                many more).{' '}
                <a href="https://docs.3perf.com/react-workshop">Full Program</a>{' '}
                ·{' '}
                <a href="https://twitter.com/iamakulov/status/1670733212967124992">
                  Free Bonus Materials
                </a>
              </p>
              <br />
              <br />
              <p>
                <strong>🌸 Core Web Vitals Masterclass.</strong> In the Core Web
                Vitals workshop, we also take a slow app → profile it → fix it –
                and then repeat, over and over, until we learn all the tools
                you’ll need to use and cover all antipatterns you might
                encounter in the wild.
              </p>
              <p>
                The workshop covers stuff like render-blocking resources,
                responsive images, font optimizations, preloading, and more.{' '}
                <a href="https://docs.3perf.com/cwv-workshop">Full Program</a>
              </p>
              <br />
            </TextMaxWidthWrapper>
            <FooterContainer>
              <MailchimpSubscribe
                text="We’re running 2-4 public workshops per year. Leave your email to learn when the next one happens:"
                // this tag ID means `workshop_interest`
                tags="2313376"
              />
              <Footer license={false} />
            </FooterContainer>
          </WidthWrapper>
        </Container>
      </Background>
    </Layout>
  );
};

export default WorkshopsPage;

export const query = graphql`
  {
    conferenceImage: file(relativePath: { eq: "workshops/conference.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1000, placeholder: NONE, layout: CONSTRAINED)
      }
    }
    slidesImage: file(relativePath: { eq: "workshops/powerpoint.png" }) {
      childImageSharp {
        gatsbyImageData(width: 600, placeholder: NONE, layout: CONSTRAINED)
      }
    }
  }
`;
