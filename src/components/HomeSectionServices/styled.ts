import styled, { css } from 'styled-components';
import media from '../../styles/media';
import { gridSize } from '../../styles/variables';
import _ActionButton from '../ActionButton';
import _Image from '../Image';
import _Section from '../Section';

const columnGapVertical = gridSize * 8;
const columnGapHorizontal = gridSize * 8;

export const Section = styled(_Section)``;

export const SvgMask = styled.svg`
  width: 0;
  height: 0;
`;

export const MobileImageWrapper = styled.div``;

export const MobileImage = styled(_Image)``;

export const DesktopImage = styled(_Image)``;

export const Text = styled.div``;

interface ImageTextProps {
  direction: 'forward' | 'reverse';
  desktopImageHeight: number;
}

export const ImageText = styled.div<ImageTextProps>`
  display: flex;
  position: relative;

  &:not(:last-child) {
    margin-bottom: ${columnGapVertical}px;
  }

  ${media.small`
    flex-direction: column;

    ${MobileImageWrapper} {
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
      flex: none;
    }

    ${MobileImage} {
      clip-path: url(#serviceMobileMask);
    }

    ${DesktopImage} {
      display: none;
    }

    ${Text} {
      margin-top: ${gridSize * 3}px;
    }
  `}

  ${media.notSmall`
    min-height: ${(props: ImageTextProps) => props.desktopImageHeight}px;

    ${MobileImageWrapper} {
      display: none;
    }

    ${DesktopImage} {
      position: absolute;
      flex: none;
      align-self: flex-start;

      ${(props: ImageTextProps) =>
        props.direction === 'forward' &&
        css`
          right: 350px;
          margin-right: ${gridSize * 2}px;
        `}

      ${(props: ImageTextProps) =>
        props.direction === 'reverse' &&
        css`
          left: 350px;
          margin-left: ${gridSize * 2}px;
        `}
    }

    ${Text} {
      margin: ${(props: ImageTextProps) =>
        props.direction === 'forward' ? '0 0 0 auto' : '0 auto 0 0'};
      margin-top: ${gridSize * 4}px;
      width: 350px;
    }
  `}
`;

export const Note = styled.p`
  font-size: 0.75em;
`;

export const Columns = styled.div`
  ${media.small`
    margin-top: ${columnGapVertical}px;
  `}

  ${media.notSmall`
    display: flex;
    margin: 0 -${columnGapHorizontal / 2}px;
  `}
`;

export const Column = styled.div`
  ${media.small`
    &:not(:last-child) {
      margin-bottom: ${columnGapVertical}px;
    }
  `}

  ${media.notSmall`
    flex: 1;
    margin: 0 ${columnGapHorizontal / 2}px;
  `}
`;

export const H3 = styled.h3`
  margin: 0 0 ${gridSize}px;
  font-size: 24px;
`;

export const ActionButton = styled(_ActionButton)`
  margin-top: ${gridSize * 8}px;
`;
