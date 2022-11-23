import styled, { css, keyframes } from 'styled-components';
import _LogoSvg from './logo.component.svg';

const moveLetters = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  } 

  100% {
    transform: translateY(0);
  }
`;

export const animationCss = css`
  #perf-letters path {
    animation: 0.15s ease-in-out ${moveLetters};
  }

  ${[...new Array(12 /* letters */).keys()]
    .map(
      (i) => `
      #perf-letters path:nth-child(${i + 1}) {
        animation-delay: ${0.03 * i}s;
      }
    `,
    )
    .join('\n')}
`;

interface LogoSvgProps {
  color: string;
}

export const LogoSvg = styled(_LogoSvg)`
  #perf-letters path {
    fill: ${(props: LogoSvgProps) => props.color};
  }

  rect {
    stroke: ${(props: LogoSvgProps) => props.color};
  }

  &.js--site-logo_animation-enabled {
    ${animationCss}
  }
`;
