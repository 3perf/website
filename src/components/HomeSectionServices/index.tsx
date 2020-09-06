import * as React from 'react';
import { SectionKind } from '../Section';
import { ActionButton, Column, Columns, H3, Section } from './styled';

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection = ({ className = '' }: ServicesSectionProps) => (
  <Section
    title="Let’s make you fast 🚀"
    className={className}
    sectionKind={SectionKind.VERTICAL}
  >
    <Columns>
      <Column>
        <H3>Audit&nbsp;🔬</H3>
        <p>
          <strong>What:</strong> we’ll analyze the site, identify all
          performance issues, and compose a document with potential
          op&shy;ti&shy;mi&shy;za&shy;tions.
        </p>
        <p>
          <strong>Details.</strong> Before the audit, we’ll ask you a bunch of
          questions to learn more about your business and your team. We’ll use
          that knowledge to tailor the audit to your concrete business needs.
        </p>
        <p>
          After the audit, once the team has familiarized themselves with the
          document, we’ll sync up, discuss any questions you might have, and
          make sure you know what to do next.
        </p>
        <p>
          <strong>Great when:</strong> you have a team that wants to learn a lot
          about their website performance, and that is ready to implement all
          optimizations themselves.
        </p>
      </Column>
      <Column>
        <H3>Optimization&nbsp;🛠</H3>
        <p>
          <strong>What:</strong> we’ll join your project, roll up our sleeves,
          find all performance bottlenecks, and apply precise optimizations –
          all by ourselves.
        </p>
        <p>
          <strong>Details.</strong> All changes will be thoroughly documented –
          both in pull requests and in the codebase, when needed. We will ensure
          your developers know what’s going on, review everything, and learn as
          much as possible about the site’s speed from the improvements we’ll
          make.
        </p>
        <p>
          We’re best within the React/webpack ecosystem. But we’ll find a common
          language as long as your project uses a modern JavaScript framework or
          bundler.
        </p>
        <p>
          <strong>Great when:</strong> you don’t want to distract the team from
          delivering important business functionality, and you want to make sure
          no implementation nuance is missed.
        </p>
      </Column>
      <Column>
        <H3>Public services&nbsp;💛</H3>
        <p>
          Are you an open-source project or a non-commerce project working for
          the greater good? Reach out to us, and we’ll be happy to help you for
          free if we’re available.
        </p>
      </Column>
      <Column>
        <H3>Something else&nbsp;🎁</H3>
        <p>
          Want something custom? We’ll be glad to chat. Reach us, and let’s
          figure out how we can help you.
        </p>
      </Column>
    </Columns>
    <ActionButton href="#contact">Chat with us</ActionButton>
  </Section>
);

export default ServicesSection;
