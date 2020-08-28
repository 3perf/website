import * as React from 'react';
import { ActionButton, Column, Columns, H3, Section } from './styled';

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection = ({ className = '' }: ServicesSectionProps) => (
  <Section title="Let’s make you fast" className={className}>
    <Columns>
      <Column>
        <H3>Loading speed&nbsp;🚀</H3>
        <p>Stop losing your cus&shy;tom&shy;ers to com&shy;pet&shy;itors.</p>
        <p>
          Let’s speed your site up – and make you rank in search higher &amp;
          convert more visits into pur&shy;chases.
        </p>
      </Column>
      <Column>
        <H3>Runtime speed&nbsp;⚛️</H3>
        <p>Make your app faster – and users happier.</p>
        <p>
          Let’s profile your app, figure out where it’s slow, and fix any issues
          – alone or together with your team.
        </p>
      </Column>
      <Column>
        <H3>Something else 🎁</H3>
        <p>
          Want something custom? We’re happy to chat. Reach us, and let’s figure
          out how we can help you.
        </p>
      </Column>
    </Columns>
    <ActionButton href="#contact">Chat with us</ActionButton>
  </Section>
);

export default ServicesSection;
