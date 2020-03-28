import * as React from 'react';
import { LogoKind } from '../Logo';
import {
  BlockLink,
  Container,
  Items,
  ItemsWrapper,
  Logo,
  NavKind,
  PrimaryItem,
  SecondaryItem,
} from './styled';

export interface NavBaseProps {
  className?: string;
  primaryItems?: Array<{
    title: string;
    href: string;
  }>;
  secondaryItems?: Array<{
    title: string;
    href: string;
  }>;
  logoKind?: LogoKind;
  navKind?: NavKind;
  logoLinksToHome?: boolean;
  isLogoPlayful?: boolean;
}

const NavBase = ({
  className,
  logoKind,
  primaryItems,
  secondaryItems,
  navKind = NavKind.Dark,
  logoLinksToHome = true,
  isLogoPlayful,
}: NavBaseProps) => (
  <Container className={className}>
    {logoLinksToHome ? (
      <BlockLink to="/">
        <Logo logoKind={logoKind} isPlayful={isLogoPlayful} />
      </BlockLink>
    ) : (
      <Logo logoKind={logoKind} isPlayful={isLogoPlayful} />
    )}
    <ItemsWrapper>
      <Items>
        {primaryItems &&
          primaryItems.map(item => (
            <PrimaryItem key={item.href} to={item.href} navKind={navKind}>
              {item.title}
            </PrimaryItem>
          ))}
        {secondaryItems &&
          secondaryItems.map(item => (
            <SecondaryItem key={item.href} to={item.href} navKind={navKind}>
              {item.title}
            </SecondaryItem>
          ))}
      </Items>
    </ItemsWrapper>
  </Container>
);

export { NavKind };

export default NavBase;
