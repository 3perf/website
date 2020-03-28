import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import { SharpImageFluid } from '../../types';
import Section from '../Section';
import { Blocks, Image, PrimaryBlock, SecondaryBlock } from './styled';

interface PerfConversionSectionData {
  aliexpress: SharpImageFluid;
  mozilla: SharpImageFluid;
  walmart: SharpImageFluid;
}

interface PerfConversionSectionProps {
  data: PerfConversionSectionData;
}

const PerfConversionSection = ({ data }: PerfConversionSectionProps) => {
  return (
    <Section title="Web performance directly affects conversion">
      <Blocks>
        <PrimaryBlock>
          <Image fluid={data.aliexpress.childImageSharp.fluid} />
          <strong>AliExpress</strong> made their site faster by 36% and got
          10.5% more orders.{' '}
          <a href="https://edge.akamai.com/ec/us/highlights/keynote-speakers.jsp#edge2016futureofcommercemodal">
            Source
          </a>
        </PrimaryBlock>
        <SecondaryBlock>
          <Image fluid={data.walmart.childImageSharp.fluid} />
          <strong>Walmart</strong> saw up to 1% increase in profits for each
          100&nbsp;ms improvement.{' '}
          <a href="https://www.slideshare.net/devonauerswald/walmart-pagespeedslide/46">
            Source
          </a>
        </SecondaryBlock>
        <SecondaryBlock>
          <Image fluid={data.mozilla.childImageSharp.fluid} />
          <strong>Mozilla</strong> made the browser download page 2.2&nbsp;s
          faster and increased downloads by 15.4%.{' '}
          <a href="https://blog.mozilla.org/metrics/2010/04/05/firefox-page-load-speed-%E2%80%93-part-ii/">
            Source
          </a>
        </SecondaryBlock>
      </Blocks>
      <p>
        This happens because the slower the site loads, the larger percentage of
        users gets distracted by a different task and doesn’t come back.
      </p>
    </Section>
  );
};

const PerfConversionSectionWithQuery = () => (
  <StaticQuery
    query={graphql`
      query {
        aliexpress: file(
          relativePath: { eq: "HomeSectionPerfConversion/aliexpress.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }

        walmart: file(
          relativePath: { eq: "HomeSectionPerfConversion/walmart.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }

        mozilla: file(
          relativePath: { eq: "HomeSectionPerfConversion/mozilla.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <PerfConversionSection data={data} />}
  />
);

export default PerfConversionSectionWithQuery;
