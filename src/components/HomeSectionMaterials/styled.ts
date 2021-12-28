import styled from 'styled-components';
import media from '../../styles/media';
import { linkStyles, linkActiveStyles } from '../../styles/shared-styles';
import { gridSize } from '../../styles/variables';
import GatsbyImage from '../Image';
import Link from '../Link';

export const LinkWrapper = styled.div`
  margin-bottom: ${gridSize}px;
`;

export const Image = styled(GatsbyImage)`
  /* Because gatsby-image uses inline styles */
  display: block !important;
  margin-bottom: ${gridSize}px;

  ${media.small`
    max-width: 250px;
  `}
`;

export const LinkText = styled.span``;

export const LinkBlock = styled(Link)`
  color: inherit;
  display: block;
  border: none;
  margin-bottom: ${gridSize}px;

  ${LinkText} {
    ${linkStyles}
  }

  &:hover,
  &:focus,
  &:active {
    ${LinkText} {
      ${linkActiveStyles}
    }
  }
`;

export const LinkDescription = styled.div`
  font-size: var(--homepage-font-size-small);
`;
