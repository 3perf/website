import * as React from 'react';
import { JSXChildrenProp } from '../../types';
import { Content, Title, Wrapper } from './styled';

interface TitleContentWrapperProps {
  alwaysVertical?: boolean;
  children: JSXChildrenProp;
  className?: string;
  title: JSXChildrenProp;
}

const TitleContentWrapper = ({
  title,
  children,
  className = '',
  alwaysVertical = false,
}: TitleContentWrapperProps) => (
  <Wrapper className={className} alwaysVertical={alwaysVertical}>
    <Title>{title}</Title>
    <Content>{children}</Content>
  </Wrapper>
);

export default TitleContentWrapper;
