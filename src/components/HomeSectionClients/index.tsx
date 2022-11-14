import * as React from 'react';
import Section, { SectionKind } from '../Section';
import {
  AppsmithLogo,
  CasesItemsContainer,
  CastorLogo,
  Content,
  FinderLogo,
  FramerLogo,
  GoogleLogo,
  HugoLogo,
  NdaLogo,
  LogoText,
  Mark,
  Tag,
  TagContainer,
} from './styled';

const ClientsSection = () => (
  <Section title="Cases" sectionKind={SectionKind.VERTICAL}>
    <CasesItemsContainer>
      <Content>
        <LogoText>
          <GoogleLogo />
          <TagContainer>
            <Tag>education</Tag>
          </TagContainer>
        </LogoText>
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
            This is some of the highest quality tutorial style documentation on
            webpack I’ve come across
          </p>
          <footer>
            <a href="https://twitter.com/TheLarkInn/status/961988627801587712">
              Sean Larkin
            </a>
            , webpack’s core team
          </footer>
        </blockquote>
      </Content>

      <Content>
        <LogoText>
          <HugoLogo />
          <p>
            <a href="https://www.hugo.team">Hugo</a> helps to keep meeting notes
            and tasks in one place.
          </p>
          <TagContainer>
            <Tag>react performance</Tag>
            <Tag>core web vitals</Tag>
          </TagContainer>
        </LogoText>
        <p>
          The Hugo team was noticing their React app was slow here and there.
          They weren’t sure what was causing that, so they reached out to
          PerfPerfPerf for help.
        </p>
        <p>
          We identified multiple loading and runtime performance optimizations
          and guided Hugo through implementing them. As a result,{' '}
          <Mark>
            Hugo’s JS init time decreased 2.5×, the editor input latency
            improved 1.7×,
          </Mark>{' '}
          and the Lighthouse score (even not being a goal) increased by 23
          points.
        </p>
        <blockquote>
          <p>
            We were more than satisfied working with Ivan. Ivan communicated
            very well throughout the whole process, and{' '}
            <Mark>
              the level of detail in his suggestions and recommendations was
              just outstanding
            </Mark>
            .
          </p>
          <footer>Christian Sampaio, CTO @ Hugo</footer>
        </blockquote>
      </Content>

      <Content>
        <LogoText>
          <FinderLogo />
          <p>
            <a href="http://finder.com.au/">Finder</a> helps 2 million
            Australian customers track spending, find deals, and save money.
          </p>
          <TagContainer>
            <Tag>core web vitals</Tag>
          </TagContainer>
        </LogoText>
        <p>
          A huge chunk of Finder’s new customers come to Finder from search.
          Finder wanted to make the site faster and grow their organic traffic,
          and they asked us to help.
        </p>
        <p>
          We helped Finder to move Core Web Vitals to green{' '}
          <Mark>for 98% of their pages</Mark>. As a result,{' '}
          <Mark>Finder’s organic traffic grew 50%</Mark>, and conversion also
          increased.
        </p>
      </Content>

      <Content>
        <LogoText>
          <CastorLogo />
          <p>
            <a href="https://www.castoredc.com/">Castor</a> is a tech platform
            that makes clinical trials easier.
          </p>
          <TagContainer>
            <Tag>react performance</Tag>
            <Tag>core web vitals</Tag>
          </TagContainer>
        </LogoText>
        <p>
          Castor reached out to us when they were building a new product. They
          noticed the product’s bundle was too large, realized Castor’s design
          system caused this, but weren’t sure how to fix it.
        </p>
        <p>
          We jumped in and made the design system load faster. We also optimized
          the runtime performance of a few critical components, increasing their
          responsiveness <Mark>from 1..2 to 20..30 FPS</Mark>.
        </p>
        <blockquote>
          <p>
            In just a couple weeks, Ivan significantly improved runtime
            performance and tree shaking of our key components. One of our
            products’ bundle got <Mark>3 times smaller</Mark> – with{' '}
            <Mark>10× less JS needed for the initial load</Mark>.
          </p>
          <footer>
            <a href="https://www.linkedin.com/in/david-sigley-4a202353/?originalSubdomain=nl">
              David Sigley
            </a>
            , Head of Engineering @ Castor
          </footer>
        </blockquote>
      </Content>

      <Content>
        <LogoText>
          <AppsmithLogo />
          <p>
            <a href="https://www.appsmith.com">Appsmith</a> is a low-code
            platform for building internal apps.
          </p>
          <TagContainer>
            <Tag>react performance</Tag>
          </TagContainer>
        </LogoText>
        <p>
          With Appsmith, we did three React rendering performance audits. This
          helped us to focus on different aspects of app’s UI speed. With audit
          recommendations implemented, <Mark>the app got 1.9…2.8× faster</Mark>{' '}
          across multiple user interactions.
        </p>
      </Content>

      <Content>
        <LogoText>
          <NdaLogo />
          <p>
            This customer was an enterprise marketing agency with an undisclosed
            name.
          </p>
          <TagContainer>
            <Tag>lighthouse score</Tag>
          </TagContainer>
        </LogoText>
        <p>
          PerfPerfPerf worked with an enterprise marketing agency to push its
          site’s <Mark>PageSpeed Insights score from ~50 to ~95</Mark>. This was
          critical for converting customers – before the optimizations, some
          customers would see a poor score and churn away.
        </p>
        <p>
          We analyzed the site, found every issue affecting the score, figured
          out how to solve them, and guided the team through implementing the
          solutions.
        </p>
        <blockquote>
          <p>
            Ivan’s advice was all exceptionally clear.{' '}
            <Mark>
              I really appreciated Ivan including his whole thought process,
            </Mark>{' '}
            including what he tried that may not have worked – before arriving
            at a final solution.
          </p>
          <p>
            <Mark>
              Ivan’s responsiveness was a godsend and a clear cut above any
              other consultants
            </Mark>{' '}
            we’ve used in the past, and the overall level of organization +
            timetable he brought was truly fantastic!
          </p>
          <footer>Ryan, Marketing Consultant</footer>
        </blockquote>
      </Content>

      <Content>
        <LogoText>
          <FramerLogo />
          <p>
            <a href="https://framer.com/">Framer</a> is an website design tool.
          </p>
          <TagContainer>
            <Tag>react performance</Tag>
            <Tag>build performance</Tag>
            <Tag>core web vitals</Tag>
          </TagContainer>
        </LogoText>
        <p>
          For Framer, higher performance means happier users and better
          retention.
        </p>
        <p>
          We worked with Framer to perfect the loading speed of Framer UI and
          Framer Sites. At the Framer UI,{' '}
          <Mark>
            we reduced Speed Index and First CPU Idle of the UI by 40-45%
          </Mark>
          . With Framer Sites, we’ve been working together to improve the Core
          Web Vitals and the Lighthouse score. We also improved the performance
          of internal tools, to make engineers more productive and save costs.
        </p>
        <blockquote>
          <p>
            We’ve been very satisfied by working with Ivan! Ivan helped us to
            improve loading performance, runtime performance, and tooling around
            it.{' '}
            <Mark>
              The quality of his work, approach, documentation, etc. has been
              outstanding.
            </Mark>
          </p>
          <footer>
            <a href="https://twitter.com/eelco">Eelco Lempsink</a>, CTO @ Framer
          </footer>
        </blockquote>
      </Content>
    </CasesItemsContainer>
  </Section>
);

export default ClientsSection;
