import styled from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../../styles/shared-styles';
import { gridSize, sizes } from '../../../styles/variables';
import { Container as SlideContainer } from '../Slide/styled';

export const Container = styled(SlideContainer)`
  &[data-animation-state='idle'] {
    [data-control-button='play'] {
      display: flex;
    }
  }

  &[data-animation-state='running'] {
    [data-control-button='pause'] {
      display: flex;
    }
  }

  &[data-animation-state='paused'] {
    [data-control-button='play'] {
      display: flex;
    }
  }

  &[data-animation-state='finished'] {
    [data-control-button='replay'] {
      display: flex;
    }
  }
`;

export const Controls = styled.div`
  margin-top: ${gridSize / 2}px;
`;

export const ControlButton = styled.button`
  display: none;

  // Mimic link styles but without the underline and blue color
  --link-color: black;
  --link-border-color: rgba(0, 0, 0, 0.25);
  border: 1px solid;

  ${linkStyles}

  align-items: center;

  margin-left: 2px;
  padding: 2px 4px;
  border-radius: 4px;
  background: white;
  font-size: ${sizes.fontSmall}px;

  &:hover,
  &:focus,
  &:active {
    ${linkActiveStyles}
  }

  svg {
    width: 16px;
    margin-right: 4px;
  }
`;
