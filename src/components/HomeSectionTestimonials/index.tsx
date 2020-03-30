import * as React from 'react';
import commonLogo from './common.svg';
import fatLlamaLogo from './fat-llama.svg';
import framerLogo from './framer.svg';
import googleLogo from './google.svg';
import {
  Blockquote,
  BlockquoteText,
  BlockquoteFooter,
  Container,
  Logo,
  Logos,
} from './styled';

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
      <Logo src={fatLlamaLogo} />
      <Logo src={googleLogo} />
      <Logo src={commonLogo} />
      <Logo src={framerLogo} />
    </Logos>
  </Container>
);

export default HomeSectionTestimonials;
