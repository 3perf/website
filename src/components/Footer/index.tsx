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
  showLegalDetails?: boolean;
  showPaymentDetails?: boolean;
}

const Footer = ({
  className,
  linkToHome = true,
  license = (
    <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a>
  ),
  useLicenseFontSpacing = true,
  showLegalDetails = false,
  extraContent,
}: FooterProps) => (
  <Container className={className}>
    <Credentials>
      <span>
        {linkToHome ? <Link href="/">PerfPerfPerf</Link> : 'PerfPerfPerf'} ·{' '}
        2018–2021
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
    {showLegalDetails && (
      <Legal>
        Legal entity: Sole proprietor Akulov Ivan Sergeevich. VAT ID (УНП)
        192789104. Belarus, Minsk. State certificate no. 192789104, issued at 17
        Mar 2017.
      </Legal>
    )}
  </Container>
);

export default Footer;
