import { css } from 'styled-components';

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

export default media;
