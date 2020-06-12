import styled from 'styled-components';
import { gridSize } from '../../styles/variables';
import _ActionButton from '../ActionButton';
import _Section from '../Section';

const columnGapVertical = 12;
const columnGapHorizontal = 24;

export const Section = styled(_Section)``;

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

export const ActionButton = styled(_ActionButton)`
  margin-top: ${gridSize * 6}px;
`;
