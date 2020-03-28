import * as React from 'react';
import { ChatButton, ChatButtonContainer, Container, Link } from './styled';

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => (
  <Container className={className}>
    <Link href="mailto:perf@3perf.com">perf@3perf.com</Link>
    <ChatButtonContainer>
      Or just{' '}
      <ChatButton onClick={() => window.Chatra('openChat', true)}>
        write us in the chat
      </ChatButton>
    </ChatButtonContainer>
  </Container>
);

export default ContactSection;
