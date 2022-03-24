import * as React from 'react';
import { JSXChildrenProp } from '../../types';
import Link from '../Link';
import { Container, Credentials, Legal, LicenseName } from './styled';

interface FooterProps {
  className?: string;
  linkToHome?: boolean;
  license?: JSXChildrenProp | false;
  useLicenseFontSpacing?: boolean;
  extraContent?: JSXChildrenProp;
  legalDetails?: string;
  showPaymentDetails?: boolean;
}

const Footer = ({
  className,
  linkToHome = true,
  license = (
    <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a>
  ),
  useLicenseFontSpacing = true,
  legalDetails,
  extraContent,
}: FooterProps) => (
  <Container className={className}>
    <Credentials>
      <span>
        {linkToHome ? <Link href="/">PerfPerfPerf</Link> : 'PerfPerfPerf'} ·{' '}
        2018–2022
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
    </Credentials>
    {legalDetails && <Legal>{legalDetails}</Legal>}
  </Container>
);

export default Footer;
