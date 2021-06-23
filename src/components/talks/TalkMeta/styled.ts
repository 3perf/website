import styled from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../../styles/shared-styles';
import { gridSize, sizes } from '../../../styles/variables';

export const Container = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: ${gridSize * 3}px;
  font-size: ${sizes.fontLarge}px;

  > * {
    margin: ${gridSize}px 0 ${gridSize}px ${gridSize * 0.75}px;

    :first-child {
      margin: ${gridSize}px 0;
    }
  }
`;

export const Date = styled.div``;

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
