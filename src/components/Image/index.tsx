import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Container } from './styled';

interface ImageProps {
  className?: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  imageData: IGatsbyImageData;
}

const Image = ({ className, alt, loading, imageData }: ImageProps) => {
  let isSafari = false;
  if (typeof window !== 'undefined') {
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  return (
    <Container className={className} isSafari={isSafari}>
      <GatsbyImage
        image={imageData}
        alt={alt}
        loading={!loading || isSafari ? 'eager' : loading}
      />
    </Container>
  );
};

export default Image;
