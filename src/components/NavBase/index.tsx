import { Fragment } from 'react';
import Link from '../Link';
import { LogoKind } from '../Logo';
import {
  BlockLink,
  Container,
  Items,
  ItemsWrapper,
  Logo,
  NavKind,
  SecondaryItems,
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
      <BlockLink href="/">
        <Logo logoKind={logoKind} isPlayful={isLogoPlayful} />
      </BlockLink>
    ) : (
      <Logo logoKind={logoKind} isPlayful={isLogoPlayful} />
    )}
    <ItemsWrapper $navKind={navKind}>
      <Items>
        {primaryItems &&
          primaryItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.title}
            </Link>
          ))}
        <SecondaryItems>
          {secondaryItems &&
            secondaryItems.map((item) => (
              <Fragment key={item.href}>
                <Link href={item.href}>{item.title}</Link>
                {item.href !== secondaryItems[secondaryItems.length - 1].href &&
                  ' or '}
              </Fragment>
            ))}
        </SecondaryItems>
      </Items>
    </ItemsWrapper>
  </Container>
);

export { NavKind };

export default NavBase;
