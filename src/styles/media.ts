import { css } from 'styled-components';

const media = {
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
};

export default media;
