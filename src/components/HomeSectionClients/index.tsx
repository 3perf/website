import * as React from 'react';
import Section, { SectionKind } from '../Section';
import {
  CastorLogo,
  Content,
  FatLlamaLogo,
  GoogleLogo,
  FramerLogo,
  Mark,
  LogoText,
  HomeLeftRightWrapper,
  CommonLogo,
} from './styled';

const ClientsSection = () => (
  <Section title="Cases" sectionKind={SectionKind.VERTICAL}>
    <HomeLeftRightWrapper
      left={<GoogleLogo />}
      right={
        <Content>
          <p>
            We worked with Google on educating developers about web performance.
            This targets the long-term goal of making the web faster.
          </p>
          <ul>
            <li>
              <a href="https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size">
                A guide to making web apps faster with webpack
              </a>{' '}
            </li>
            <li>
              <a href="https://github.com/GoogleChromeLabs/webpack-libs-optimizations">
                A list of tricks
              </a>{' '}
              to optimize dependencies
            </li>
            <li>
              <a href="https://github.com/GoogleChromeLabs/webpack-training-project">
                A training project
              </a>{' '}
              to practice optimization strategies
            </li>
          </ul>

          <blockquote>
            <p>
              This is some of the highest quality tutorial style documentation
              on webpack I’ve come across
            </p>
            <footer>
              <a href="https://twitter.com/TheLarkInn/status/961988627801587712">
                Sean Larkin
              </a>
              , a member of the webpack’s core team
            </footer>
          </blockquote>
        </Content>
      }
    />

    <HomeLeftRightWrapper
      left={
        <LogoText>
          <FramerLogo />
          <p>
            <a href="https://framer.com/">Framer</a> is a web-based tool for
            interactive interface design – one of the hottest ones, today.
          </p>
        </LogoText>
      }
      right={
        <Content>
          <p>
            We worked with Framer to perfect their user experience – by making
            user interactions smoother and app loading faster.
          </p>
          <p>
            By working together,{' '}
            <Mark>
              we reduced Speed Index and First CPU Idle of Framer Web by 40-45%
            </Mark>
            . We also set up tooling around runtime perf – to help Framer keep
            &amp; maintain achieved results in the future.
          </p>
          <blockquote>
            <p>
              We’ve been very satisfied by working with Ivan! Ivan helped us to
              improve loading performance, runtime performance, and tooling
              around it.{' '}
              <Mark>
                The quality of his work, approach, documentation, etc. has been
                outstanding.
              </Mark>
            </p>
            <footer>
              <a href="https://twitter.com/eelco">Eelco Lempsink</a>, VP of
              Engineering @ Framer
            </footer>
          </blockquote>
        </Content>
      }
    />

    <HomeLeftRightWrapper
      left={
        <LogoText>
          <CommonLogo />
          <p>
            <a href="https://common.com/">Common</a> is a modern coliving rental
            company. They pride themselves on the design of their housing.
          </p>
        </LogoText>
      }
      right={
        <Content>
          <p>
            Common wanted to improve their marketing ROI – and reached to us to
            help make their website faster. We jumped in and{' '}
            <Mark>improved the PageSpeed Insights score from 39 to 75.</Mark>
          </p>
          <blockquote>
            <p>
              Working with Ivan was <Mark>an absolute joy</Mark>. He reliably
              produces world-class work, communicates effectively and often, and
              is always willing to share his deep expertise in application
              performance optimization.
            </p>
            <footer>
              <a href="https://www.linkedin.com/in/ldthorne/">Daniel Thorne</a>,
              Software Engineer @ Common
            </footer>
          </blockquote>
        </Content>
      }
    />

    <HomeLeftRightWrapper
      left={
        <LogoText>
          <FatLlamaLogo />
          <p>
            <a href="https://fatllama.com/">Fat Llama</a> is an e-commerce
            service that helps people borrow things (cameras, cars, games, tech,
            anything) from other people.
          </p>
        </LogoText>
      }
      right={
        <Content>
          <p>
            Fat Llama had issues with page loading performance. They
            successfully improved a lot of things themselves, but reached to us
            before finishing the optimization.
          </p>
          <p>
            We helped Fat Llama to find low-hanging (and not so low-hanging)
            fruits that went unnoticed – and improve performance metrics even
            further.
          </p>
          <blockquote>
            <p>
              Ivan gave a ton of extremely useful, actionable feedback that{' '}
              <Mark>
                directly improved our First Meaningful Paint, Time to
                Interactive, Speed Index, First CPU Idle metrics significantly
              </Mark>
              . Also, he helped with some bundle size optimization too.
            </p>
            <p>
              Interaction with Ivan is{' '}
              <Mark>
                dense in terms of knowledge transfer, and I guarantee you that
                you will learn a lot of new things.
              </Mark>{' '}
              On top of all these, he’s a super smooth person to work with. All
              in all, I cannot recommend Ivan enough!
            </p>
            <footer>
              <a href="https://twitter.com/cihatimamoglu">Cihat Imamoglu</a>,
              Senior Software Engineer @ Fat Llama
            </footer>
          </blockquote>
        </Content>
      }
    />

    <HomeLeftRightWrapper
      left={
        <LogoText>
          <CastorLogo />
          <p>
            <a href="https://www.castoredc.com/">Castor</a> is a tech platform
            that makes clinical trials easier
          </p>
        </LogoText>
      }
      right={
        <Content>
          <p>We made Castor’s React design system load and execute faster.</p>
          <blockquote>
            <p>
              In just a couple weeks, Ivan significantly improved runtime
              performance and tree shaking of our key components. One of our
              products’ bundle got 3 times smaller – with 10× less JS needed for
              the initial load.
            </p>
            <footer>
              <a href="https://www.linkedin.com/in/david-sigley-4a202353/?originalSubdomain=nl">
                David Sigley
              </a>
              , Head of Engineering @ Castor
            </footer>
          </blockquote>
        </Content>
      }
    />
  </Section>
);

export default ClientsSection;
