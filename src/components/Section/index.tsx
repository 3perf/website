import * as React from 'react';
import { JSXChildrenProp } from '../../types';
import TitleContentWrapper from '../TitleContentWrapper';
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
  <TitleContentWrapper
    className={className}
    title={<H2>{title}</H2>}
    alwaysVertical={sectionKind === SectionKind.VERTICAL}
  >
    <Content>{children}</Content>
  </TitleContentWrapper>
);

export default Section;
