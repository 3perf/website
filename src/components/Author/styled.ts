import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../styles/shared-styles';
import { gridSize } from '../../styles/variables';

export const Link = styled.a`
  display: flex;
  border: none;
  color: inherit;
  align-items: center;

  &:hover,
  &:focus,
  &:active {
    color: inherit;
  }
`;

export const Image = styled(GatsbyImage)`
  width: 48px;
  flex: none;
  margin-right: ${gridSize * 2}px;

  border-radius: 50%;
  overflow: hidden;
`;

export const Content = styled.div``;

export const Name = styled.div`
  ${linkStyles};
  font-weight: bold;
  border: none;

  ${Link}:hover &,
  ${Link}:focus &,
  ${Link}:active & {
    ${linkActiveStyles};
  }
`;

export const Description = styled.div`
  font-size: 0.75em;
`;
