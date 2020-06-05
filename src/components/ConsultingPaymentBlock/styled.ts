import styled, { keyframes } from 'styled-components';
import { gridSize } from '../../styles/variables';

export const PayButton = styled.button`
  display: inline-block;
  border: none;
  border-radius: 4px;
  padding: ${gridSize * 1.5}px ${gridSize * 3}px;
  /* Fix width and height to make sure the button doesn’t jump when there’s a spinner inside */
  min-width: 140px;
  min-height: 46px;

  font: inherit;
  color: white;
  background: black;
  transition: transform 0.2s ease-out;

  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    transform: scale(1.05);
    transition: transform 0.4s cubic-bezier(0.75, -0.64, 0, 2.89);
  }

  &:disabled {
    transform: none;
    background: #999;
    cursor: not-allowed;
  }
`;

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const ButtonSpinner = styled.div`
  margin: 0 auto;
  border-top: 0.1em solid rgba(255, 255, 255, 0.2);
  border-right: 0.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.1em solid rgba(255, 255, 255, 0.2);
  border-left: 0.1em solid #ffffff;
  transform: translateZ(0);
  animation: ${spinnerAnimation} 1.1s infinite linear;

  &,
  &:after {
    border-radius: 50%;
    width: 1em;
    height: 1em;
  }
`;
