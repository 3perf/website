import styled from 'styled-components';
import { gridSize } from '../../styles/variables';
import _ChatButton from '../ChatButton';
import _Section from '../Section';

const columnGapVertical = 12;
const columnGapHorizontal = 24;

export const Section = styled(_Section)``;

export const Foreword = styled.p`
  margin-bottom: 24px;
`;

export const Columns = styled.div`
  display: flex;
  margin: -${columnGapVertical}px -${columnGapHorizontal}px;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  flex: 1 0 250px;
  margin: ${columnGapVertical}px ${columnGapHorizontal}px;
`;

export const H3 = styled.h3`
  margin: 0;
  font-size: 24px;
`;

// Prevent the emoji from increasing the line-height of a line
export const Emoji = styled.span`
  position: absolute;
`;

export const Badge = styled.span`
  border: thin solid black;
  border-radius: 2px;
  padding: 0 4px;

  text-transform: uppercase;
  font-weight: normal;
  font-size: 0.75em;
  letter-spacing: 1px;
`;

export const ChatButton = styled(_ChatButton)`
  margin-top: ${gridSize * 6}px;
`;
