import { IGatsbyImageData } from 'gatsby-plugin-image';
import { JSXChildrenProp } from '../../../types';
import { Container, Description, Image, Title } from './styled';

interface TalkHeaderProps {
  imageData: IGatsbyImageData;
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
