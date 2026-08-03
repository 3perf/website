import { HeadProps, graphql } from 'gatsby';
import Image from '../../components/Image';
import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import WidthWrapper from '../../components/WidthWrapper';
import { useSiteMetadata } from '../../shared/useSiteMetadata';
import { GraphqlImage } from '../../types';
import facebookCoverUrl from './cover.png';
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
  Blockquote,
  PhotoImage,
} from './styled';

export const Head = ({ location }: HeadProps) => {
  const siteMetadata = useSiteMetadata();

  return (
    <>
      <title>Massilia</title>
      <meta
        name="description"
        content="Learn how to make your app faster with these workshops from Ivan Akulov. Featured at Smashing Conf, React Summit, and more."
      />
      <meta
        name="keywords"
        content="react performance workshop, core web vitals workshop, loading performance workshop, react interaction performance workshop, runtime react speed workshop"
      />
      <meta name="og:image" content={facebookCoverUrl} />
      <link rel="canonical" href={siteMetadata.siteUrl + location.pathname} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

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
            <Marquee duration={180}>
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
            <Marquee duration={250}>
              <span>third parties</span> · <span>cache-control</span> ·{' '}
              <span>webpagetest</span> · <span>staying fast</span> ·{' '}
              <span>prefetching</span> ·&nbsp;
            </Marquee>
          </Keywords>
          <WidthWrapper>
            <TextMaxWidthWrapper>
              <Header>Learn Web Per&shy;for&shy;mance First-Hand</Header>
              <p>
                Since 2017,{' '}
                <a
                  href="https://twitter.com/iamakulov"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ivan Akulov
                </a>{' '}
                has been helping companies like Framer, Restream, Toggl, and
                dozens more make their apps and sites faster. Over those years,
                Ivan has developed a step-by-step approach to improving web
                performance. Now, he’s teaching this approach to other
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
                Since most workshops are remote, getting photos like this is
                hard; so this is a photo of Ivan speaking at{' '}
                <a href="https://reactsummit.com/">React Summit</a> instead 😇
              </figcaption>
            </figure>
            <figure>
              <Image
                imageData={data.slidesImage.childImageSharp.gatsbyImageData}
              />
              <figcaption>
                Every workshop comes with cheatsheets for real-world performance
                issues
              </figcaption>
            </figure>
            <Blockquote>
              <p>
                I’ve had plenty of trainings in the past that were full-frontal
                “death by powerpoint” where I had wished to do something
                practical for a change, but not in this [React Performance]
                workshop
              </p>
              <footer>
                —{' '}
                <a href="https://www.linkedin.com/in/patrickhund/">
                  Patrick Hund
                </a>
                , Principal Web Engineer
              </footer>
            </Blockquote>
          </FigureContainer>
          <WidthWrapper>
            <TextMaxWidthWrapper>
              <p>
                <strong>⚛️ React Performance Masterclass.</strong> In the React
                workshop, we take several slow apps → profile them → and fix
                each of them. Along the way, we learn numerous performance tools
                and encounter all the common React performance antipatterns.
              </p>
              <p>
                The workshop covers both basic (<code>useMemo()</code>, Chrome
                DevTools, React Profiler) and advanced topics (React Context,{' '}
                <code>why-did-you-render</code>, <code>useTransition</code>,
                virtualization, and many more).{' '}
                <a href="https://docs.3perf.com/react-workshop">Full program</a>{' '}
                ·{' '}
                <a href="https://twitter.com/iamakulov/status/1670733212967124992">
                  Free bonus materials
                </a>
              </p>
              <br />
              <br />
              <p>
                <strong>🌸 Core Web Vitals Masterclass.</strong> In the Core Web
                Vitals workshop, we take several slow apps → profile them → and
                fix them. In the process, we learn how to improve each Core Web
                Vital, use tools like Lighthouse and WebPageTest, and solve
                common issues you might encounter in the wild.
              </p>
              <p>
                The workshop covers things like render-blocking resources,
                responsive images, font optimization, preloading, and more.{' '}
                <a href="https://docs.3perf.com/cwv-workshop">Full program</a>
              </p>
              <br />
            </TextMaxWidthWrapper>
            <FooterContainer>
              <MailchimpSubscribe
                text="We’re running a few public workshops per year. Leave your email to learn when the next one happens:"
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
    slidesImage: file(relativePath: { eq: "workshops/cheatsheets.png" }) {
      childImageSharp {
        gatsbyImageData(width: 600, placeholder: NONE, layout: CONSTRAINED)
      }
    }
  }
`;
