import { css } from 'styled-components';
import { animations } from './variables';

export const linkStyles = css`
  color: var(--link-color);
  text-decoration: none;
  cursor: pointer;
  // The properties below are split so that the border color applies
  // to fully-bordered images as well
  border-bottom: 1px solid;
  border-color: var(--link-border-color);
  transition: color ${animations.hover.duration} ${animations.hover.easing},
    border-color ${animations.hover.duration} ${animations.hover.easing};
`;

export const linkActiveStyles = css`
  color: var(--link-active-color);
  border-color: var(--link-active-border-color);
  transition: none;
`;
