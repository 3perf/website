import styled from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../../styles/shared-styles';
import { gridSize, sizes } from '../../../styles/variables';

export const Container = styled.div`
  margin-top: ${gridSize * 3}px;
  font-size: ${sizes.fontLarge}px;
`;

export const Date = styled.time``;

export const AuthorLink = styled.a`
  ${linkStyles};
  font-weight: bold;

  :hover &,
  :focus &,
  :active & {
    ${linkActiveStyles};
  }
`;
