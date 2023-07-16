import { JSXChildrenProp } from '../../../types';
import { Container, Link } from './styled';

const SectionHeader = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: JSXChildrenProp;
}) => {
  return (
    <Container id={id} className={className}>
      <Link href={`#${id}`}>{children}</Link>
    </Container>
  );
};

export default SectionHeader;
