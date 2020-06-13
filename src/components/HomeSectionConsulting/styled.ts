import styled from 'styled-components';
import media from '../../styles/media';
import { colors, gridSize } from '../../styles/variables';
import _ActionButton from '../ActionButton';

export const Container = styled.div`
  background: ${colors.softYellow};
  margin: 0 -${gridSize * 6}px;
  padding: ${gridSize * 4}px calc(${gridSize * 6}px - 5px);
  border: 5px solid black;
`;

export const Header = styled.h2`
  font-weight: 900;
  font-size: 32px;
  margin: 0 0 ${gridSize * 2}px;
  line-height: 1.3;

  ${media.notSmall`
    font-size: 40px;
    margin-bottom: ${gridSize * 4}px;
  `}
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  list-style: none;

  & + & {
    margin-top: 0;
  }

  &:nth-child(1)::before {
    content: '1️⃣ ';
  }

  &:nth-child(2)::before {
    content: '2️⃣ ';
  }

  &:nth-child(3)::before {
    content: '3️⃣ ';
  }
`;

export const ActionButton = styled(_ActionButton)`
  margin-top: ${gridSize * 3}px;

  ${media.notSmall`
    margin-top: ${gridSize * 5}px;
  `}
`;
