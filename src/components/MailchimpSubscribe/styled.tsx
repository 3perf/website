import { lighten } from 'polished';
import styled from 'styled-components';
import { colors, gridSize, sizes } from '../../styles/variables';

export const Container = styled.div``;

export const MailchimpForm = styled.form`
  margin-top: ${sizes.paragraphSpacing}px;
`;

export const MailchimpInput = styled.input`
  margin-right: ${gridSize * 2}px;
  margin-bottom: ${gridSize}px;
  height: 32px;
  border: none;
  border-radius: 2px;
  padding: 0 12px;

  font-size: inherit;
  font-family: inherit;
`;

export const MailchimpSubmit = styled.input`
  cursor: pointer;

  height: 32px;
  padding: 0 12px;
  border-radius: 2px;

  font-size: inherit;
  font-family: inherit;

  background: ${colors.brightYellow};
  color: black;
  border: none;

  &:hover,
  &:focus,
  &:active {
    background: ${lighten(0.2, colors.brightYellow)};
  }
`;

export const HiddenDiv = styled.div.attrs({
  'aria-hidden': true,
})`
  position: absolute;
  left: -5000px;
`;
