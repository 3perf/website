import styled from 'styled-components';
import media from '../../../styles/media';
import { colors, gridSize, sizes } from '../../../styles/variables';

export const Figure = styled.figure`
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

export const Link = styled.a`
  color: inherit;
  border: none;
  position: relative;

  &::before {
    content: '#';

    position: absolute;
    left: -135px;
    top: -20px;

    /* Increase the area to allow moving the mouse from the image to the element */
    width: 180px;
    text-align: center;
    font-size: 60px;
    font-weight: bold;

    color: #ccc;

    /* Hide & animate the element */
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
    transition: all 0.15s ease-out;
  }

  &:hover,
  &:focus,
  &:active {
    &::before {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
      transition: none;
    }
  }
`;

export const CaptionHeader = styled.span`
  font-weight: 900;
  background: ${colors.brightYellow};
  color: black;
  padding: 0 ${gridSize}px;
  margin-left: -${gridSize}px;

  /* Inherit link hover styles */
  transition: inherit;
  ${Link}:is(:hover, :focus, :active) & {
    color: inherit;
  }
`;

export const Video = styled.video`
  width: 100%;

  ${media.small`
    width: 100vw;
    margin-left: -${sizes.contentPadding}px;
  `}
`;
