import styled, { keyframes } from 'styled-components';
import { linkStyles, linkActiveStyles } from '../../styles/shared-styles';

export const ScheduleInsteadButton = styled.button`
  border: unset;
  border-radius: unset;
  padding: unset;
  background: unset;
  font: inherit;

  ${linkStyles}

  &:hover, &:focus, &:active {
    ${linkActiveStyles}
  }
`;

const blinkingAnimation = keyframes`
  0% { opacity: 0 }
  50% { opacity: 1 }
  100% { opacity: 0 }
`;

export const BlinkingColon = styled.span`
  animation: ${blinkingAnimation} step-end infinite 2s;
`;
