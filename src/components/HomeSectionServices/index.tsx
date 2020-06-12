import * as React from 'react';
import {
  Badge,
  ActionButton,
  Column,
  Columns,
  Emoji,
  Foreword,
  H3,
  Section,
} from './styled';

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection = ({ className = '' }: ServicesSectionProps) => (
  <Section
    title={
      <span>
        Let’s make you earn more&nbsp;<Emoji>💸</Emoji>
      </span>
    }
    className={className}
  >
    <Foreword>We can:</Foreword>
    <Columns>
      <Column>
        <H3>Fix a problem</H3>
        <p>
          We’ll analyze and solve your particular performance issue. If your app
          loads slowly, or a page freezes when you use it, this is for you.
        </p>
        <p>We won’t take money if we’re unable to solve the issue.</p>
      </Column>
      <Column>
        <H3>Keep the app fast</H3>
        <p>
          Once per month, we’ll analyze your app and fix all the performance
          issues we can find. If you want to never think about your app’s speed
          again, this is for you.
        </p>
        <p>
          To make this reliable, we’ll define specific performance budgets
          (loading time or app size) and keep the app inside them.
        </p>
      </Column>
    </Columns>
    <ActionButton href="#contact">Chat with us</ActionButton>
  </Section>
);

export default ServicesSection;
