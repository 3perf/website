import styled from 'styled-components';
import media from '../../styles/media';
import { sizes, colors } from '../../styles/variables';
import _HomeLeftRightWrapper from '../HomeLeftRightWrapper';
import appsmithUrl from './appsmith.svg';
import castorUrl from './castor.svg';
import commonUrl from './common.svg';
import fatLlamaUrl from './fat-llama.svg';
import framerUrl from './framer.svg';
import googleUrl from './google.svg';

export const CasesItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const leftSpacing = 30;
export const Content = styled.div`
  flex-basis: 100%;
  margin-bottom: 48px;
  :nth-last-child(1) {
    margin-bottom: 0px;
  }
  font-size: 16px;

  ${media.notSmall`
    flex-basis: 50%;
    :nth-child(odd) {
      padding-right: 72px;
    }
    :nth-last-child(2) {
      margin-bottom: 0px;
    }
  }
  `};

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
  font-size: 0.75em;
`;

const Logo = styled.img`
  display: block;
  margin: 0 0 12px;
  height: 48px;

  ${media.notSmall`
    margin-top: 10px;
  `};
`;

export const TagContainer = styled.div`
  margin-top: 4px;

  div {
    display: inline-block;
    background: ${colors.brightYellow};
    margin-top: 4px;
    padding: 2px 8px;
    border-radius: 2px;
    margin-right: 8px;
  }
`;

export const Mark = styled.mark`
  background: ${colors.softYellow};
`;

export const GoogleLogo = styled(Logo).attrs({
  src: googleUrl,
})`
  margin-bottom: 4px;
`;

export const CastorLogo = styled(Logo).attrs({
  src: castorUrl,
})``;

export const AppsmithLogo = styled(Logo).attrs({
  src: appsmithUrl,
})``;

export const FatLlamaLogo = styled(Logo).attrs({
  src: fatLlamaUrl,
})``;

export const FramerLogo = styled(Logo).attrs({
  src: framerUrl,
})``;

export const CommonLogo = styled(Logo).attrs({
  src: commonUrl,
})``;
