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
  extraContent,
}: FooterProps) => (
  <Container className={className}>
    <Credentials>
      <span>
        {linkToHome ? <Link href="/">PerfPerfPerf</Link> : 'PerfPerfPerf'} ·
        2017–{new Date().getFullYear()}
        {license && (
          <span>
            {' '}
            · License:{' '}
            <LicenseName $useFontSpacing={useLicenseFontSpacing}>
              {license}
            </LicenseName>
          </span>
        )}
        {extraContent}
      </span>
      <span>🖤</span>
    </Credentials>
    <Legal>
      Sole proprietorship (eenmanszaak). Herengracht 551, 1017 BW Amsterdam,
      Netherlands. KvK no. 86522469. VAT ID NL004265772B46.{' '}
      <a href="/legal/terms/">Terms and Conditions</a>.{' '}
      <a href="/legal/privacy/">Privacy Policy</a>
    </Legal>
  </Container>
);

export default Footer;
