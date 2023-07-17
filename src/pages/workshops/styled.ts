import styled from 'styled-components';
import _Footer from '../../components/Footer';
import _MailchimpSubscribe from '../../components/MailchimpSubscribe';
import _Nav from '../../components/Nav';
import _Marquee from '../../components/Marquee';
import media from '../../styles/media';
import { colors, gridSize, sizes } from '../../styles/variables';

export const Background = styled.div`
  min-height: 100vh;
  background-color: #111;
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;

  color: white;

  --link-color: white;
  --link-border-color: rgba(255, 255, 255, 0.25);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  font-size: ${sizes.fontLarge}px;

  ${media.small`
    font-size: ${sizes.fontDefault}px;
  `}
`;

export const Nav = styled(_Nav)`
  margin-right: auto;
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 6}px;
  font-size: 16px;
`;

export const Header = styled.h1`
  margin: 0 0 ${gridSize * 3}px;
  font-size: 3em;
  line-height: 1.2;
  font-weight: 900;
  color: ${colors.brightYellow};
`;

export const FooterContainer = styled.div`
  margin-top: auto;
`;

export const MailchimpSubscribe = styled(_MailchimpSubscribe)`
  margin-top: ${gridSize * 5}px;
  max-width: 600px;
  padding: ${gridSize * 2}px ${gridSize * 3}px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 8}px;
  margin-bottom: ${gridSize * 2}px;
  font-size: ${sizes.fontSmall}px;
`;

export const TextMaxWidthWrapper = styled.div`
  max-width: 60ch;
`;

export const Marquee = styled(_Marquee)`
  line-height: 1.05;
`;

export const Keywords = styled.div`
  margin: 0 0 ${gridSize * 6}px;
  font-size: 40px;
  color: #222;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  gap: -${gridSize * 2}px;

  ${media.notSmall`
    margin: 0 0 ${gridSize * 12}px;
    font-size: 80px;
`}
`;

export const FigureContainer = styled.div`
  display: flex;
  margin: ${gridSize * 6}px auto;
  padding: 0 ${sizes.contentPadding}px;
  gap: ${gridSize * 6}px;
  max-width: 1400px;
  width: 100%;

  figure {
    margin: 0;
  }

  figure:nth-child(1) {
    flex: 1.5;
  }

  figure:nth-child(2) {
    flex: 1;
  }

  figcaption {
    font-size: ${sizes.fontDefault}px;
  }

  ${media.small`
    flex-direction: column;
  `}
`;
