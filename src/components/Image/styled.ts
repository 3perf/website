import styled from 'styled-components';

export const Container = styled.span`
  display: inline-block;
  /* Copy default gatsby-image’s styles – this helps to easily apply border-radius */
  overflow: hidden;
  /* Remove extra spacing below the image: https://stackoverflow.com/a/13961130 */
  line-height: 0;
`;
