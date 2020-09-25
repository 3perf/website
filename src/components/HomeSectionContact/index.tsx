import { StaticQuery, graphql } from 'gatsby';
import * as React from 'react';
import { GraphqlImageFixed } from '../../types';
import { PromptContainer, Container, ContactImage, Link } from './styled';

interface ContactSectionData {
  iamakulov: GraphqlImageFixed;
}

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({
  className = '',
  data,
}: ContactSectionProps & { data: ContactSectionData }) => (
  <div className={className}>
    <Container>
      <Link href="mailto:perf@3perf.com">perf@3perf.com</Link>
      <PromptContainer>
        <p>
          Interested? We’d be glad to help. Drop us an email, and{' '}
          <ContactImage
            imageData={data.iamakulov.childImageSharp.fixed}
            Tag="span"
          />{' '}
          Ivan will get back to you in 24 hours.
        </p>
      </PromptContainer>
    </Container>
  </div>
);

const ContactSectionWithQuery = (props: ContactSectionProps) => (
  <StaticQuery
    query={graphql`
      fragment ContactImage on File {
        childImageSharp {
          fixed(width: 24, height: 24, quality: 75) {
            ...ImageFixed
          }
        }
      }

      query {
        iamakulov: file(
          relativePath: { eq: "HomeSectionContact/iamakulov.jpg" }
        ) {
          ...ContactImage
        }
      }
    `}
    render={(data) => <ContactSection data={data} {...props} />}
  />
);

export default ContactSectionWithQuery;
