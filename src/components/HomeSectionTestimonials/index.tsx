import appsmithLogo from './appsmith.svg';
import castorLogo from './castor.svg';
import commonLogo from './common.svg';
import fatLlamaLogo from './fat-llama.svg';
import finderLogo from './finder.svg';
import framerLogo from './framer.svg';
import googleLogo from './google.svg';
import hugoLogo from './hugo.svg';
import restreamLogo from './restream.svg';
import sitepointLogo from './sitepoint.svg';
import {
  Blockquote,
  BlockquoteText,
  BlockquoteFooter,
  Container,
  Logo,
  Logos,
} from './styled';
import togglLogo from './toggl.svg';

const HomeSectionTestimonials = () => (
  <Container>
    <Blockquote>
      <BlockquoteText>
        A ton of extremely useful, actionable feedback that directly and
        significantly improved our First Meaningful Paint, Time to Interactive,
        [and] Speed Index
      </BlockquoteText>
      <BlockquoteFooter>
        — Cihat Imamoglu, Senior Software Engineer @{' '}
        <a href="https://fatllama.com/">Fat Llama</a>
      </BlockquoteFooter>
    </Blockquote>
    <Logos>
      <Logo src={fatLlamaLogo} width="127" height="62" />
      <Logo src={googleLogo} width="148" height="62" />
      <Logo src={commonLogo} width="284" height="62" />
      <Logo src={framerLogo} width="40" height="62" />
      <Logo src={appsmithLogo} width="60" height="62" />
      <Logo src={castorLogo} width="188" height="62" />
      <Logo src={hugoLogo} width="61" height="62" />
      <Logo src={sitepointLogo} width="273" height="62" />
      <Logo src={togglLogo} width="111" height="62" />
      <Logo src={finderLogo} width="172" height="62" />
      <Logo src={restreamLogo} width="232" height="62" />
    </Logos>
  </Container>
);

export default HomeSectionTestimonials;
