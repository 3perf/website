import * as React from 'react';
import { PromptContainer, Container, Link } from './styled';

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => (
  <div className={className}>
    <Container>
      <Link href="mailto:perf@3perf.com">perf@3perf.com</Link>
      <PromptContainer>
        <p>
          Interested? We’d be glad to help. Just drop us an email, and we’ll get
          back shortly.
        </p>
      </PromptContainer>
    </Container>
  </div>
);

export default ContactSection;
