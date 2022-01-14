import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { Container } from './styled';

interface ImageProps {
  className?: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  imageData: IGatsbyImageData;
}

const Image = ({ className, alt, loading, imageData }: ImageProps) => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }
  }, []);

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
