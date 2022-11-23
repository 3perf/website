import styled from 'styled-components';
import { gridSize } from '../../styles/variables';

interface ButtonComponentProps {
  // Use `$` to make this a transient prop:
  $kind: 'light' | 'dark';
}

export const ButtonComponent = styled.a`
  display: inline-block;
  border: none;
  border-radius: 4px;
  padding: ${gridSize * 1.5}px ${gridSize * 3}px;
  color: ${(props: ButtonComponentProps) =>
    props.$kind === 'dark' ? 'white' : 'black'};
  background: ${(props: ButtonComponentProps) =>
    props.$kind === 'dark' ? 'black' : 'white'};
  transition: transform 0.2s ease-out;

  &:hover,
  &:focus,
  &:active {
    @media (prefers-reduced-motion: no-preference) {
      color: ${(props: ButtonComponentProps) =>
        props.$kind === 'dark' ? 'white' : 'black'};
      transform: scale(1.05);
      transition: transform 0.4s cubic-bezier(0.75, -0.64, 0, 2.89);
    }
  }
`;
