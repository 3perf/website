import styled from 'styled-components';
import media from '../../styles/media';
import { linkActiveStyles, linkStyles } from '../../styles/shared-styles';
import { gridSize } from '../../styles/variables';

export const Container = styled.div`
  text-align: center;
`;

export const Link = styled.a`
  font-size: 84px;
  font-weight: bold;

  color: black;
  border-bottom-color: rgba(0, 0, 0, 0.25);

  ${media.small`
    font-size: calc(10vw);
  `};
`;

export const ChatButtonContainer = styled.div`
  margin-top: ${gridSize * 6}px;
`;

export const ChatButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font: inherit;
  cursor: pointer;

  ${linkStyles};

  color: black;
  border-bottom-color: rgba(0, 0, 0, 0.25);

  &:hover,
  &:focus,
  &:active {
    ${linkActiveStyles};
  }
`;
