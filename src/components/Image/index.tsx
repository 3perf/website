import { IGatsbyImageData, GatsbyImageProps } from 'gatsby-plugin-image';
import React from 'react';
import { Container, Img } from './styled';

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
      <picture>
        {imageData.images.sources?.map((source) => (
          <source
            key={source.srcSet}
            srcSet={source.srcSet}
            sizes={source.sizes}
            type={source.type}
          />
        ))}
        {imageData.images.fallback && (
          <Img
            src={imageData.images.fallback.src}
            srcSet={imageData.images.fallback.srcSet}
            sizes={imageData.images.fallback.sizes}
            loading={loading || 'lazy'}
            alt={alt}
            style={imgStyle}
            width={imageData.width}
            height={imageData.height}
            layout={imageData.layout}
          />
        )}
      </picture>
    </Container>
  );
};

export default Image;
