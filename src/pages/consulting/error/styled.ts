import styled, { createGlobalStyle } from 'styled-components';
import _Footer from '../../../components/Footer';
import _Nav from '../../../components/Nav';
import media from '../../../styles/media';
import { gridSize, sizes, colors } from '../../../styles/variables';

export const BodyBackground = createGlobalStyle`
  body {
    background: ${colors.softYellow}
  }
`;

export const Main = styled.main`
  flex: 1;

  ${media.notSmall`
    font-size: 24px;
  `}
`;

export const Header = styled.h1`
  font-weight: 900;
  margin: 0 0 ${gridSize * 2}px;

  ${media.notSmall`
    font-size: 96px;
    white-space: nowrap;
    margin: ${gridSize * 6}px 0 ${gridSize * 4}px;
  `}
`;

export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 6}px;
  font-size: 16px;
`;

export const ErrorMessage = styled.p`
  font-family: 'Fira Code', 'Fira Mono', monospace;
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 6}px;
  margin-bottom: ${gridSize * 2}px;
`;

export const FlexWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Note = styled.p`
  margin-top: ${gridSize * 4}px;
  font-size: ${sizes.fontSmall}px;

  ${media.notSmall`
    font-size: ${sizes.fontDefault}px;
  `}
`;
