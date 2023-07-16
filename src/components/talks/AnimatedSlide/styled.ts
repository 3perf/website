import styled from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../../styles/shared-styles';
import { gridSize, sizes } from '../../../styles/variables';
import { Container as _Container } from '../Slide/styled';

export const Container = styled(_Container)`
  svg {
    height: auto;
    display: block;
  }
`;

export const Controls = styled.div`
  margin-top: ${gridSize / 2}px;
`;

export const ControlButton = styled.button`
  display: flex;
  align-items: center;

  // Mimic link styles but without the underline and blue color
  --link-color: black;
  --link-border-color: rgba(0, 0, 0, 0.25);
  border: 1px solid;

  ${linkStyles}

  margin-left: 2px;
  padding: 2px 4px;
  border-radius: 4px;
  background: white;
  font-size: ${sizes.fontSmall}px;

  &:hover,
  &:active {
    ${linkActiveStyles}
  }

  &:focus {
    border-color: var(--link-active-border-color);
  }

  svg {
    width: 16px;
    margin-right: 4px;
  }
`;
