import {
  IGatsbyImageData,
  GatsbyImage,
  GatsbyImageProps,
} from 'gatsby-plugin-image';
import React from 'react';
import { Container } from './styled';

export interface ImageProps {
  imageData: IGatsbyImageData;
  alt?: string;
  className?: string;
  loading?: GatsbyImageProps['loading'];
  style?: GatsbyImageProps['style'];
  imgStyle?: GatsbyImageProps['imgStyle'];
}

const Image = ({
  className,
  loading,
  imageData,
  alt = '',
  style,
  imgStyle,
}: ImageProps) => {
  return (
    <Container className={className} style={style}>
      <GatsbyImage
        image={imageData}
        alt={alt}
        loading={loading}
        imgStyle={imgStyle}
      />
    </Container>
  );
};

export default Image;
