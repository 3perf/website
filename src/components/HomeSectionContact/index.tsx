import { StaticQuery, graphql } from 'gatsby';
import * as React from 'react';
import { GraphqlImage } from '../../types';
import {
  PromptContainer,
  Container,
  Contact,
  ContactImage,
  Link,
} from './styled';

interface ContactSectionData {
  iamakulov: GraphqlImage;
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
      <Link href="https://savvycal.com/3perf/intake">book a call</Link>
      <PromptContainer>
        <p>
          Interested? We’d be glad to help. Book a call with{' '}
          <Contact>
            <ContactImage
              imageData={data.iamakulov.childImageSharp.gatsbyImageData}
            />{' '}
            Ivan
          </Contact>
          , and we’ll figure out how to get you fast.
        </p>
        <p>
          Or, prefer emails? Drop us a message at{' '}
          <a href="mailto:perf@3perf.com">perf@3perf.com</a>.
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
          gatsbyImageData(
            width: 24
            height: 24
            quality: 75
            placeholder: NONE
            layout: FIXED
          )
        }
      }

      {
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
