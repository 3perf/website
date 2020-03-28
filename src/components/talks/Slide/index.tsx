import * as React from 'react';
import { JSXChildrenProp } from '../../../types';
import { Container, ImageWrapper, SlideLink, Text } from './styled';

interface SlideProps {
  slideId: string;
  image: JSXChildrenProp;
  children: JSXChildrenProp;
  className?: string;
  useImageBorder?: boolean;
  isSectionHeader?: boolean;
}

const Slide = ({
  slideId,
  image,
  children,
  className,
  useImageBorder = false,
  isSectionHeader = false,
}: SlideProps) => (
  <Container className={className} id={slideId}>
    <ImageWrapper
      href={`#${slideId}`}
      useImageBorder={useImageBorder}
      isSectionHeader={isSectionHeader}
    >
      {image}
    </ImageWrapper>
    <Text isSectionHeader={isSectionHeader}>{children}</Text>
  </Container>
);

export default Slide;
export { SlideGatsbyImage } from './styled';
