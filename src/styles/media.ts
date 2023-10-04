import { css } from 'styled-components';

// This needs to be reworked (as it breaks syntax highlighting), so ignoring the ESLint error for now
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const media = {
  xSmall: (arg: any, ...otherArgs: any[]) => css`
    @media (max-width: 425px) {
      ${css(arg, ...otherArgs)}
    }
  `,

  small: (arg: any, ...otherArgs: any[]) => css`
    @media (max-width: 768px) {
      ${css(arg, ...otherArgs)}
    }
  `,

  notSmall: (arg: any, ...otherArgs: any[]) => css`
    @media (min-width: 769px) {
      ${css(arg, ...otherArgs)}
    }
  `,

  medium: (arg: any, ...otherArgs: any[]) => css`
    @media (max-width: 1024px) {
      ${css(arg, ...otherArgs)}
    }
  `,

  notMedium: (arg: any, ...otherArgs: any[]) => css`
    @media (min-width: 1025px) {
      ${css(arg, ...otherArgs)}
    }
  `,
};
/* eslint-enable @typescript-eslint/no-unsafe-argument */

export default media;
