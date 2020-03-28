import React from 'react';
import { JSXChildrenProp } from '../../types';
import { ButtonComponent } from './styled';

interface ChatButtonProps {
  className?: string;
  href?: string;
  children?: JSXChildrenProp;
  kind?: 'light' | 'dark';
}

const ChatButton = ({
  className = '',
  href = '#contact',
  children = 'Chat with us',
  kind = 'dark',
}: ChatButtonProps) => (
  <ButtonComponent className={className} href={href} kind={kind}>
    {children}
  </ButtonComponent>
);

export default ChatButton;
