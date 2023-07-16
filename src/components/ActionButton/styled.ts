import styled from 'styled-components';
import { gridSize } from '../../styles/variables';

export const ButtonComponent = styled.a<{
  $kind: 'light' | 'dark';
}>`
  display: inline-block;
  border: none;
  border-radius: 4px;
  padding: ${gridSize * 1.5}px ${gridSize * 3}px;
  color: ${(props) => (props.$kind === 'dark' ? 'white' : 'black')};
  background: ${(props) => (props.$kind === 'dark' ? 'black' : 'white')};
  transition: transform 0.2s ease-out;

  &:hover,
  &:focus,
  &:active {
    @media (prefers-reduced-motion: no-preference) {
      color: ${(props) => (props.$kind === 'dark' ? 'white' : 'black')};
      transform: scale(1.05);
      transition: transform 0.4s cubic-bezier(0.75, -0.64, 0, 2.89);
    }
  }
`;
