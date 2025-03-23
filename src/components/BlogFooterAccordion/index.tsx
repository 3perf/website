import { graphql, useStaticQuery } from 'gatsby';
import { GraphqlImage } from '../../types';
import Image from '../Image';
import { Container, Item, ItemLink, Label, LabelWrapper } from './styled';

const stuffToPromote = [
  {
    imageKey: 'webPerf101',
    title: 'Web Performance 101',
    href: '/talks/web-perf-101/',
  },
  {
    imageKey: 'reactConcurrency',
    title: 'React Concurrency, Explained',
    href: '/talks/react-concurrency/',
  },
];

interface BlogFooterAccordionProps {
  className?: string;
}

const BlogFooterAccordion = ({ className }: BlogFooterAccordionProps) => {
  const data: { [key: string]: GraphqlImage } = useStaticQuery(graphql`
    {
      webPerf101: file(
        relativePath: { eq: "BlogFooterAccordion/web-perf-101.png" }
      ) {
        childImageSharp {
          gatsbyImageData(height: 130, placeholder: NONE, layout: FIXED)
        }
      }
      reactConcurrency: file(
        relativePath: { eq: "BlogFooterAccordion/react-concurrency.png" }
      ) {
        childImageSharp {
          gatsbyImageData(height: 130, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  return (
    <Container className={className}>
      {stuffToPromote.map((i) => (
        <Item key={i.imageKey}>
          <ItemLink href={i.href}>
            <Image
              alt=""
              imageData={data[i.imageKey].childImageSharp.gatsbyImageData}
            />
            <LabelWrapper>
              <Label>{i.title}</Label>
            </LabelWrapper>
          </ItemLink>
        </Item>
      ))}
    </Container>
  );
};

export default BlogFooterAccordion;
