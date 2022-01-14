import styled, { css } from 'styled-components';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const Container = styled.span`
  display: inline-block;
  /* Copy default gatsby-image’s styles – this helps to easily apply border-radius */
  overflow: hidden;
  /* Remove extra spacing below the image: https://stackoverflow.com/a/13961130 */
  line-height: 0;

  ${isSafari &&
  css`
    .gatsby-image-wrapper > img {
      opacity: 1 !important;
    }

    .gatsby-image-wrapper > div {
      opacity: 0 !important;
    }
  `}
`;
