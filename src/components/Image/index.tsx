import { graphql } from 'gatsby';
import React from 'react';
import { Container, Img } from './styled';

export interface ImageFixed {
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp?: string;
  srcSetWebp?: string;
}

export interface ImageFluid {
  presentationWidth: number;
  presentationHeight: number;
  src: string;
  srcSet: string;
  sizes: string;
  srcWebp?: string;
  srcSetWebp?: string;
}

interface ImageProps {
  className?: string;
  loading?: 'eager' | 'lazy';
  // We’re not using a type union ({ fixed: ... } | { fluid: ... })
  // because then, styled-components wrappers don’t pick up fixed and fluid props
  imageData: ImageFixed | ImageFluid;
}

const Image = ({ className, loading, imageData }: ImageProps) => {
  return (
    <Container className={className}>
      <picture>
        {imageData.srcWebp && (
          <source
            src={imageData.srcWebp}
            srcSet={imageData.srcSetWebp}
            sizes={'sizes' in imageData ? imageData.sizes : undefined}
            type="image/webp"
          />
        )}
        <source
          srcSet={imageData.srcSet}
          sizes={'sizes' in imageData ? imageData.sizes : undefined}
        />
        <Img
          isFluid={'presentationWidth' in imageData}
          src={imageData.src}
          width={
            'width' in imageData ? imageData.width : imageData.presentationWidth
          }
          loading={loading || 'lazy'}
          height={
            'height' in imageData
              ? imageData.height
              : imageData.presentationHeight
          }
        />
      </picture>
    </Container>
  );
};

export const query = graphql`
  fragment ImageFixed on ImageSharpFixed {
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }

  fragment ImageFluid on ImageSharpFluid {
    presentationWidth
    presentationHeight
    src
    srcSet
    sizes
    srcWebp
    srcSetWebp
  }
`;

export default Image;
