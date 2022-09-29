import styled from 'styled-components';
import media from '../../../styles/media';

export const Container = styled.h2``;

export const Link = styled.a`
  color: inherit;
  border: none;
  position: relative;

  font-size: 60px;
  font-weight: bold;
  white-space: nowrap;

  ${media.small`
    font-size: 48px;
    white-space: normal;
    line-height: 1;
  `};

  &::before {
    content: '#';

    position: absolute;
    left: -135px;

    /* Increase the area to allow moving the mouse from the image to the element */
    width: 180px;
    text-align: center;

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
