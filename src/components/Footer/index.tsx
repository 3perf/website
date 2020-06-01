import * as React from 'react';
import { JSXChildrenProp } from '../../types';
import Link from '../Link';
import { Container, LicenseName } from './styled';

interface FooterProps {
  className?: string;
  linkToHome?: boolean;
  license?: JSXChildrenProp | false;
  useLicenseFontSpacing?: boolean;
  extraContent?: JSXChildrenProp;
}

const Footer = ({
  className,
  linkToHome = true,
  license = (
    <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a>
  ),
  useLicenseFontSpacing = true,
  extraContent,
}: FooterProps) => (
  <Container className={className}>
    <span>
      {linkToHome ? <Link href="/">PerfPerfPerf</Link> : 'PerfPerfPerf'} ·{' '}
      2018–2020
      {license && (
        <span>
          {' '}
          · License:{' '}
          <LicenseName useFontSpacing={useLicenseFontSpacing}>
            {license}
          </LicenseName>
        </span>
      )}
      {extraContent}
    </span>
    <span>🖤</span>
  </Container>
);

export default Footer;
