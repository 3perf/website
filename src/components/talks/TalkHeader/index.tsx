import { IGatsbyImageData } from 'gatsby-plugin-image';
import { JSXChildrenProp } from '../../../types';
import { Container, Description, Image, Subtitle, Title } from './styled';

interface TalkHeaderProps {
  imageData: IGatsbyImageData;
  title: JSXChildrenProp;
  subtitle?: JSXChildrenProp;
  description: JSXChildrenProp;
  className?: string;
}

const TalkHeader = ({
  imageData,
  title,
  subtitle,
  description,
  className,
}: TalkHeaderProps) => (
  <Container className={className}>
    <Image loading="eager" imageData={imageData} />
    <Title $hasSubtitle={!!subtitle}>
      {title}
      {subtitle && (
        <>
          : <Subtitle>{subtitle}</Subtitle>
        </>
      )}
    </Title>
    <Description>{description}</Description>
  </Container>
);

export default TalkHeader;
