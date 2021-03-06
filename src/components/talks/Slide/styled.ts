import styled, { css } from 'styled-components';
import media from '../../../styles/media';
import { sizes } from '../../../styles/variables';
import GatsbyImage from '../../Image';

export const Container = styled.figure`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: -8px;

  font-family: 'Merriweather', Georgia, serif;

  > * {
    margin: 8px;
  }
`;

interface ImageWrapperProps {
  useImageBorder: boolean;
  isSectionHeader: boolean;
}

// prettier-ignore
export const ImageWrapper = styled.a`
  position: relative;
  display: block;
  border: none;
  width: 100%;
  max-width: 500px;
  border: thin solid
    ${(props: ImageWrapperProps) =>
      props.useImageBorder ? '#ccc' : 'transparent'};

  ${(props: ImageWrapperProps) => props.isSectionHeader && css`
    ${media.notSmall`
      max-width: 700px;
    `}

    ${media.small`
      margin: 0 -${sizes.contentPadding}px;
      width: calc(100% + ${sizes.contentPadding}px * 2);
      max-width: none;
    `}
  `}

  &::before {
    content: '#';

    position: absolute;
    top: -30px;
    left: -135px;

    /* Increase the area to allow moving the mouse from the image to the element */
    width: 180px;
    height: 120px;
    text-align: center;
    line-height: 120px;

    color: #ccc;
    font-size: 48px;
    font-weight: bold;

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

  > * {
    width: 100%;
  }
`;

interface TextWrapperProps {
  isSectionHeader: boolean;
}

// prettier-ignore
export const Text = styled.figcaption`
  flex: 1 1 300px;
  margin-top: calc(10px + 4px);
  word-break: break-word;

  ${(props: TextWrapperProps) => props.isSectionHeader && css`
    ${media.notSmall`
      font-size: 1.25em;
    `}
  `}
`;

export const SlideLink = styled.a`
  display: inline-block;
  margin-top: 24px;
  color: #999;

  border-bottom-color: #ccc;
`;

export const SlideGatsbyImage = styled(GatsbyImage)`
  display: block;
`;
