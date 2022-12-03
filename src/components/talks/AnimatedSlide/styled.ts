import styled from 'styled-components';
import { Container as _Container } from '../Slide/styled';

export const Container = styled(_Container)`
  margin: 48px -8px -8px -8px;
`;

export const PlayControlButton = styled.span`
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 5px;
  text-align: center;

  font-size: 14px;
  color: #06c;

  cursor: pointer;
  user-select: none;

  &:hover {
    text-decoration: underline;
  }
`;
