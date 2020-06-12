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
        <p>Let’s get your PageSpeed Insights score as high as possible!</p>
        <p>
          We’ll learn how performance affects your business and then make your
          site fast – focusing on direct business benefits.
        </p>
      </Column>
      <Column>
        <H3>Runtime speed&nbsp;⚛️</H3>
        <p>Is your React app freezing on rerenders? Let’s fix it.</p>
        <p>
          We’ll work alone or with your team to dig into runtime performance
          issues, fix them, and make your users happier.
        </p>
      </Column>
      <Column>
        <H3>Consulting ⚡</H3>
        <p>
          Not sure where to start, or just have a bunch of questions? Book{' '}
          <a href="/consulting">an express consulting session.</a>
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
