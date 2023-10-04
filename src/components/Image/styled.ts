import { IGatsbyImageData } from 'gatsby-plugin-image';
import styled, { css } from 'styled-components';

export const Container = styled.span`
  display: inline-block;
  /* Copy default gatsby-image’s styles – this helps to easily apply border-radius */
  overflow: hidden;
  /* Remove extra spacing below the image: https://stackoverflow.com/a/13961130 */
  line-height: 0;
`;

export const Img = styled.img<{
  $layout: IGatsbyImageData['layout'];
  width: number;
}>`
  ${(props) => {
    if (props.$layout === 'constrained') {
      return css`
        width: 100%;
        height: auto;
        max-width: ${props.width}px;
      `;
    }

    if (props.$layout === 'fullWidth') {
      return css`
        width: 100%;
        height: auto;
      `;
    }

    return '';
  }}
`;
