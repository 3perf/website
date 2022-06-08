import styled from 'styled-components';
import media from '../../../styles/media';
import { colors, gridSize, sizes } from '../../../styles/variables';

export const Container = styled.figure`
  position: relative;
  margin: 0;
  padding: ${gridSize * 4}px 0 ${gridSize * 6}px;

  color: white;

  ${media.small`
    padding: ${gridSize * 2}px 0 ${gridSize * 3}px;
  `}

  &::before {
    content: '';

    /* Positioning is based on https://css-tricks.com/full-width-containers-limited-width-parents/#no-calc-needed */
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    bottom: 0;
    z-index: -1;

    margin-left: -50vw;
    margin-right: -50vw;

    background: #222;
  }
`;

export const Caption = styled.figcaption`
  font-size: 36px;
  margin-bottom: ${gridSize * 2}px;

  ${media.small`
    font-size: 24px;
    margin-bottom: ${gridSize * 1.5}px;
  `}
`;

export const CaptionHeader = styled.span`
  font-weight: 900;
  background: ${colors.brightYellow};
  color: black;
  padding: 0 ${gridSize}px;
  margin-left: -${gridSize}px;
`;

export const Video = styled.video`
  width: 100%;
`;
