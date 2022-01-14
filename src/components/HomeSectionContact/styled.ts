import styled, { keyframes } from 'styled-components';
import media from '../../styles/media';
import { linkStyles, linkActiveStyles } from '../../styles/shared-styles';
import { gridSize } from '../../styles/variables';
import Image from '../Image';

export const Container = styled.div`
  margin: 0 -60px;
  max-width: 900px;
  padding: 30px 100px 40px 60px;
  border-radius: 4px;
  background: #ffdb01;
  color: #000;
`;

export const Dot = styled.span`
  color: transparent;

  &::before {
    content: '.';
    position: absolute;
    text-decoration: none;
  }
`;

const jump = keyframes`
  0% {
    transform: scale(1,1) translateY(0)
  }
  20% {
    transform: scale(.95,1.05) translateY(-15px)
  }
  40% {
    transform: scale(1.03,.97) translateY(0)
  }
  57% {
    transform: scale(.97,1.03) translateY(-10px)
  }
  74% {
    transform: scale(1.02,.98) translateY(0)
  }
  80% {
    transform: scale(1.02,.98) translateY(0)
  }
  100% {
    transform: scale(1,1) translateY(0)
  }
`;

export const Link = styled.a`
  font-size: 84px;
  font-weight: bold;

  color: black;
  border-bottom: none;
  text-decoration: underline;

  white-space: nowrap;

  ${media.small`
    font-size: calc(10vw);
  `};

  ${Dot}::before {
    ${linkStyles}
    color: black;
    border-bottom: none;
  }

  &:hover,
  &:focus,
  &:active {
    ${Dot}::before {
      ${linkActiveStyles}
      border: none;

      @media (prefers-reduced-motion: no-preference) {
        animation: ${jump} 0.7s;
        animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
      }
    }
  }
`;

export const PromptContainer = styled.div`
  margin-top: ${gridSize * 6}px;

  ${media.small`
    margin-top: ${gridSize * 3}px;
  `}
`;

export const Contact = styled.span`
  white-space: nowrap;
`;

export const ContactImage = styled(Image)`
  border-radius: 50%;
  /* -5px is hand-picked for better visual alignment */
  vertical-align: -5px;
`;
