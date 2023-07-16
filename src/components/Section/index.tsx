import { JSXChildrenProp } from '../../types';
import HomeLeftRightWrapper from '../HomeLeftRightWrapper';
import { Content, H2 } from './styled';

interface SectionProps {
  children: JSXChildrenProp;
  className?: string;
  sectionKind?: SectionKind;
  title: JSXChildrenProp;
}

export enum SectionKind {
  HORIZONTAL,
  VERTICAL,
}

const Section = ({
  title,
  children,
  className = '',
  sectionKind = SectionKind.HORIZONTAL,
}: SectionProps) => (
  <HomeLeftRightWrapper
    className={className}
    left={<H2>{title}</H2>}
    right={<Content>{children}</Content>}
    alwaysVertical={sectionKind === SectionKind.VERTICAL}
  />
);

export default Section;
