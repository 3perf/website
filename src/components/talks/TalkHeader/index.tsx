import * as React from 'react';
import { JSXChildrenProp } from '../../../types';
import { ImageFluid } from '../../Image';
import { Container, Description, Image, Title } from './styled';

interface TalkHeaderProps {
  imageData: ImageFluid;
  title: JSXChildrenProp;
  description: JSXChildrenProp;
  className?: string;
}

const TalkHeader = ({
  imageData,
  title,
  description,
  className,
}: TalkHeaderProps) => (
  <Container className={className}>
    <Image loading="eager" imageData={imageData} />
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Container>
);

export default TalkHeader;
