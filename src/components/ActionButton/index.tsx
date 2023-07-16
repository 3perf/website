import { JSXChildrenProp } from '../../types';
import { ButtonComponent } from './styled';

interface ChatButtonProps {
  className?: string;
  href: string;
  children: JSXChildrenProp;
  kind?: 'light' | 'dark';
}

const ActionButton = ({
  className = '',
  href,
  children,
  kind = 'dark',
}: ChatButtonProps) => (
  <ButtonComponent className={className} href={href} $kind={kind}>
    {children}
  </ButtonComponent>
);

export default ActionButton;
