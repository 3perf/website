import * as React from 'react';
import Section, { SectionKind } from '../Section';
import {
  CmttLogo,
  Content,
  FatLlamaLogo,
  GoogleLogo,
  JochenSchweizerLogo,
  LogoText,
  TitleContentWrapper,
} from './styled';

const ClientsSection = () => (
  <Section title="Cases" sectionKind={SectionKind.VERTICAL}>
    <TitleContentWrapper title={<GoogleLogo />}>
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
            This is some of the highest quality tutorial style documentation on
            webpack I’ve come across
          </p>
          <footer>
            <a href="https://twitter.com/TheLarkInn/status/961988627801587712">
              Sean Larkin
            </a>
            , a member of the webpack’s core team
          </footer>
        </blockquote>
      </Content>
    </TitleContentWrapper>

    <TitleContentWrapper
      title={
        <LogoText>
          <FatLlamaLogo />
          <p>
            <a href="https://fatllama.com/">Fat Llama</a> is an e-commerce
            service that helps people borrow things (cameras, cars, games, tech,
            anything) from other people.
          </p>
        </LogoText>
      }
    >
      <Content>
        <p>
          Fat Llama had issues with page loading performance. They successfully
          improved a lot of things themselves, but reached to us before
          finishing the optimization.
        </p>
        <p>
          We helped Fat Llama to find low-hanging (and not so low-hanging)
          fruits that went unnoticed – and improve performance metrics even
          further.
        </p>
        <blockquote>
          <p>
            Ivan gave a ton of extremely useful, actionable feedback that
            directly improved our First Meaningful Paint, Time to Interactive,
            Speed Index, First CPU Idle metrics significantly. Also, he helped
            with some bundle size optimization too.
          </p>
          <p>
            Interaction with Ivan is dense in terms of knowledge transfer, and I
            guarantee you that you will learn a lot of new things. On top of all
            these, he’s a super smooth person to work with. All in all, I cannot
            recommend Ivan enough!
          </p>
          <footer>
            <a href="https://twitter.com/cihatimamoglu">Cihat Imamoglu</a>,
            Senior Software Engineer @ Fat Llama
          </footer>
        </blockquote>
      </Content>
    </TitleContentWrapper>

    <TitleContentWrapper
      title={
        <LogoText>
          <CmttLogo />
          <p>
            <a href="https://cmtt.ru/">CMTT</a> is a Russia-based media holding
            company with sites like <a href="https://vc.ru">VC</a> and{' '}
            <a href="https://tjournal.ru">TJournal</a>.
          </p>
        </LogoText>
      }
    >
      <Content>
        <p>
          CMTT had an issue: when an article on one of their sites had a lot of
          comments, scrolling the page was freezing the browser.
        </p>
        <p>
          We helped CMTT to optimize the scrolling performance of comments on
          their sites. The frames-per-second rate got 4–10× higher depending on
          the device.
        </p>
        <blockquote>
          <p>
            Ivan Akulov found a beautiful solution and implemented it on his
            own. We’ve been satisfied with the results!
          </p>
          <footer>
            <a href="https://chekalskiy.ru/">Ilya Chekalskiy</a>, CMTT’s CTO
          </footer>
        </blockquote>
      </Content>
    </TitleContentWrapper>

    <TitleContentWrapper
      title={
        <LogoText>
          <JochenSchweizerLogo />
          <p>
            <a href="https://www.jochen-schweizer.de/">Jochen Schweizer</a> is a
            German e-commerce company selling experiences (such as hiking with
            huskies, dinners in an unusual place, and so on).
          </p>
        </LogoText>
      }
    >
      <Content>
        <p>
          Jochen Schweizer had multiple web performance issues with loading and
          using the site.
        </p>
        <p>
          We helped to find performance issues and improve the site speed. Made
          the initial rendering more than twice faster; fixed the runtime
          issues.
        </p>
      </Content>
    </TitleContentWrapper>
  </Section>
);

export default ClientsSection;
