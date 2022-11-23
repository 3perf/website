import styled from 'styled-components';
import media from '../../styles/media';
import { colors, gridSize } from '../../styles/variables';

export const Container = styled.div``;

export const Blockquote = styled.blockquote`
  /* Reset inherited styles */
  all: unset;

  display: flex;
  margin: 0;

  ${media.small`
    flex-direction: column;
  `}
`;

export const BlockquoteText = styled.p`
  position: relative;

  flex: 3;
  margin-right: 36px;

  font-size: 32px;

  &::before {
    content: '“';
    position: absolute;
    color: ${colors.brightYellow};
    font-size: 120px;
    z-index: -1;
    font-weight: 900;
    top: -50px;
    left: -40px;
  }

  ${media.small`
    margin-right: 0;
    font-size: 24px;
  `}
`;

export const BlockquoteFooter = styled.footer`
  /* Reset inherited styles */
  all: unset;

  flex: 1;

  ${media.small`
    margin-top: 24px;
  `}

  &::before {
    /* Reset inherited styles */
    all: unset;
  }
`;

export const Logos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${3 * gridSize}px ${8 * gridSize}px;

  margin-top: ${8 * gridSize}px;

  ${media.small`
    gap: ${4 * gridSize}px ${2 * gridSize}px;
  `}
`;

export const Logo = styled.img`
  ${media.small`
    height: 31px;
    width: auto;
  `}
`;
