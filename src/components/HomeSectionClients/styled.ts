import styled from 'styled-components';
import media from '../../styles/media';
import { sizes } from '../../styles/variables';
import _TitleContentWrapper from '../TitleContentWrapper';
import cmttUrl from './cmtt.svg';
import fatLlamaUrl from './fat-llama.svg';
import googleUrl from './google.svg';
import jochenSchweizerUrl from './jochen-schweizer.svg';

export const TitleContentWrapper = styled(_TitleContentWrapper)`
  & + & {
    margin-top: 36px;
  }
`;

const leftSpacing = 30;
export const Content = styled.div`
  ul + blockquote,
  p + blockquote,
  blockquote + ul,
  p + ul {
    margin-top: ${sizes.paragraphSpacing}px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: ${leftSpacing}px;
  }

  li::before {
    content: '—';
    position: absolute;
    transform: translateX(-${leftSpacing}px);
  }

  blockquote {
    margin: 0;
    padding: 12px 0 16px ${leftSpacing - 5}px;
    border-left: 5px solid #eee;
  }

  blockquote footer {
    margin-top: 10px;
    font-size: 0.75em;
    color: #777;

    &::before {
      content: '— ';
    }
  }
`;

export const LogoText = styled.div`
  margin-bottom: ${sizes.paragraphSpacing}px;

  ${media.notSmall`
    font-size: 0.75em;
  `};
`;

const Logo = styled.img`
  display: block;
  margin: 0 0 12px;
  width: 120px;

  ${media.notSmall`
    margin-top: 10px;
  `};
`;

export const GoogleLogo = styled(Logo).attrs({
  src: googleUrl,
})`
  margin-bottom: 4px;
`;

export const CmttLogo = styled(Logo).attrs({
  src: cmttUrl,
})``;

export const FatLlamaLogo = styled(Logo).attrs({
  src: fatLlamaUrl,
})``;

export const JochenSchweizerLogo = styled(Logo).attrs({
  src: jochenSchweizerUrl,
})``;
