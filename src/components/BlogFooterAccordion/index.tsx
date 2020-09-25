import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { GraphqlImageFixed } from '../../types';
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
    title: 'Articles & open-source tools',
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
              ...ImageFixed
            }
          }
        }

        services: file(
          relativePath: { eq: "BlogFooterAccordion/services.png" }
        ) {
          childImageSharp {
            fixed(height: 130) {
              ...ImageFixed
            }
          }
        }

        content: file(relativePath: { eq: "BlogFooterAccordion/content.png" }) {
          childImageSharp {
            fixed(height: 130) {
              ...ImageFixed
            }
          }
        }
      }
    `}
    render={(data: { [key: string]: GraphqlImageFixed }) => (
      <Container className={className}>
        {stuffToPromote.map((i) => (
          <Item key={i.imageKey}>
            <ItemLink href={i.href}>
              <Image imageData={data[i.imageKey].childImageSharp.fixed} />
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
