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
        // as="span" ensures the image doesn’t break markup when it’s used inside a <p>
        as="span"
        // display: inline-block ensures browsers respect the width and height Gatsby sets on the image
        // (this is needed because a span is `display: inline` by default)
        style={{ display: 'inline-block' }}
        image={imageData}
        alt={alt}
        loading={loading}
        imgStyle={imgStyle}
      />
    </Container>
  );
};

export default Image;
