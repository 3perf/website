import {
  IGatsbyImageData,
  GatsbyImage,
  GatsbyImageProps,
} from 'gatsby-plugin-image';
import React from 'react';
import { Container } from './styled';

interface ImageProps {
  imageData: IGatsbyImageData;
  alt?: string;
  className?: string;
  loading?: GatsbyImageProps['loading'];
}

const Image = ({ className, loading, imageData, alt = '' }: ImageProps) => {
  return (
    <Container className={className} isSafari={false}>
      <GatsbyImage image={imageData} alt={alt} loading={loading} />
    </Container>
  );
};

export default Image;
