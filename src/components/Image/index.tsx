import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Container } from './styled';

interface ImageProps {
  className?: string;
  loading?: 'eager' | 'lazy';
  imageData: IGatsbyImageData;
}

const Image = ({ className, loading, imageData }: ImageProps) => {
  return (
    <Container className={className}>
      <GatsbyImage image={imageData} alt="" loading={loading || 'lazy'} />
    </Container>
  );
};

export default Image;
