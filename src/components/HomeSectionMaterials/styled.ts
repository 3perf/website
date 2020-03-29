import styled, { css } from 'styled-components';
import { gridSize } from '../../styles/variables';
import GatsbyImage from '../Image';

export const Text = styled.div`
  margin-bottom: ${gridSize * 2}px;
`;

export const Links = styled.div`
  columns: 2 200px;
  margin-bottom: ${gridSize * 3}px;
`;

export const LinkWrapper = styled.div`
  margin-bottom: 16px;
  break-inside: avoid;
  page-break-inside: avoid;
`;

interface ImageExtraProps {
  addBorder?: boolean;
}

export const Image = styled(GatsbyImage)`
  /* Because gatsby-image uses inline styles */
  display: block !important;
  height: 100px;

  ${(props: ImageExtraProps) =>
    props.addBorder &&
    css`
      border: 1px solid #ccc;
    `};
`;
