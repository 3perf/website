import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { SharpImageFixed } from '../../types';
import Image from '../Image';
import { Container, Item, ItemLink, Label, LabelWrapper } from './styled';

const stuffToPromote = [
  {
    imageKey: 'webPerf101',
    title: 'Web Performance 101',
    href: '/talks/web-perf-101/',
  },
  {
    imageKey: 'content',
    title: 'Our articles & tools',
    href: '/content',
  },

  {
    imageKey: 'services',
    title: 'Performance consulting',
    href: '/#clients',
  },
];

interface BlogFooterAccordionProps {
  className?: string;
}

const BlogFooterAccordion = ({ className }: BlogFooterAccordionProps) => (
  <StaticQuery
    query={graphql`
      query {
        webPerf101: file(
          relativePath: { eq: "BlogFooterAccordion/web-perf-101.png" }
        ) {
          childImageSharp {
            fixed(height: 130) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        services: file(
          relativePath: { eq: "BlogFooterAccordion/services.png" }
        ) {
          childImageSharp {
            fixed(height: 130) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        content: file(relativePath: { eq: "BlogFooterAccordion/content.png" }) {
          childImageSharp {
            fixed(height: 130) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data: { [key: string]: SharpImageFixed }) => (
      <Container className={className}>
        {stuffToPromote.map(i => (
          <Item key={i.imageKey}>
            <ItemLink to={i.href}>
              <Image fixed={data[i.imageKey].childImageSharp.fixed} />
              <LabelWrapper>
                <Label>{i.title}</Label>
              </LabelWrapper>
            </ItemLink>
          </Item>
        ))}
      </Container>
    )}
  />
);

export default BlogFooterAccordion;
