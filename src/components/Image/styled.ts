import styled, { css } from 'styled-components';

export const Container = styled.span`
  display: inline-block;
  /* Copy default gatsby-image’s styles – this helps to easily apply border-radius */
  overflow: hidden;
  /* Remove extra spacing below the image: https://stackoverflow.com/a/13961130 */
  line-height: 0;
`;

export const Img = styled.img<{ isFluid: boolean }>`
  ${(props) =>
    props.isFluid &&
    css`
      width: 100%;
      height: auto;
    `}
`;
