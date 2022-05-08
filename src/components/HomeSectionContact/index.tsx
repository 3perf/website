import { StaticQuery, graphql } from 'gatsby';
import * as React from 'react';
import { GraphqlImageFixed } from '../../types';
import {
  PromptContainer,
  Container,
  Contact,
  ContactImage,
  Dot,
  Link,
} from './styled';

interface ContactSectionData {
  iamakulov: GraphqlImageFixed;
  christopherlarscarlson: GraphqlImageFixed;
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
      <Link href="mailto:perf@3perf.com">
        perf@3perf<Dot>.</Dot>com
      </Link>
      <PromptContainer>
        <p>
          Interested? We’d be glad to help. Drop us an email, and{' '}
          <Contact>
            <ContactImage imageData={data.iamakulov.childImageSharp.fixed} />{' '}
            Ivan
          </Contact>{' '}
          will get back to you in 24 hours.
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
        christopherlarscarlson: file(
          sourceInstanceName: { eq: "shared" }
          relativePath: { eq: "christopherlarscarlson.jpg" }
        ) {
          ...ContactImage
        }
        iamakulov: file(
          sourceInstanceName: { eq: "shared" }
          relativePath: { eq: "iamakulov.jpg" }
        ) {
          ...ContactImage
        }
      }
    `}
    render={(data: ContactSectionData) => (
      <ContactSection data={data} {...props} />
    )}
  />
);

export default ContactSectionWithQuery;
