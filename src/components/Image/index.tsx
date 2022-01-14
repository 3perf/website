import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Container } from './styled';

HTMLImageElement.prototype.loading = 'eager';

interface ImageProps {
  className?: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  imageData: IGatsbyImageData;
}

const Image = ({ className, alt, loading, imageData }: ImageProps) => {
  return (
    <Container className={className}>
      <GatsbyImage image={imageData} alt={alt} loading={loading ?? 'lazy'} />
    </Container>
  );
};

export default Image;
