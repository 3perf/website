import styled from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../../styles/shared-styles';
import { gridSize, sizes } from '../../../styles/variables';
import { Container as SlideContainer } from '../Slide/styled';

export const Container = styled(SlideContainer)`
  // This MUST mimic the button click logic in index.tsx
  &[data-animation-state='idle'] {
    [data-control-button-state='play'] {
      display: flex;
    }
  }

  &[data-animation-state='running'] {
    [data-control-button-state='pause'] {
      display: flex;
    }
  }

  &[data-animation-state='paused'] {
    [data-control-button-state='play'] {
      display: flex;
    }
  }

  &[data-animation-state='finished'] {
    [data-control-button-state='replay'] {
      display: flex;
    }
  }
`;

export const Controls = styled.div`
  margin-top: ${gridSize / 2}px;
`;

export const ControlButton = styled.button`
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
`;

export const ControlButtonState = styled.span`
  display: none;
  align-items: center;

  svg {
    width: 16px;
    margin-right: 4px;
  }
`;
