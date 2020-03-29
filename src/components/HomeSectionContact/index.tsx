import * as React from 'react';
import { Container, Link } from './styled';

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => (
  <Container className={className}>
    <Link href="mailto:perf@3perf.com">perf@3perf.com</Link>
  </Container>
);

export default ContactSection;
