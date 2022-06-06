import styled from 'styled-components';
import media from '../styles/media';
import { colors, gridSize, sizes } from '../styles/variables';

export const BackgroundWrapper = styled.div`
  background: #000;
  min-height: 100vh;
  color: white;
  padding: ${sizes.navTopMargin}px 0 ${gridSize}px;
`;

export const Content = styled.div`
  ${media.notSmall`
    text-align: center;
  `}
`;

export const Header = styled.h1`
  color: ${colors.brightYellow};
  font-size: 36px;
  font-weight: 900;
  margin: ${gridSize * 8}px 0 ${gridSize * 3}px;

  ${media.notSmall`
    font-size: 60px;
    margin-top: ${gridSize * 16}px;
  `}
`;

export const Text = styled.p``;
