import styled from 'styled-components';
import { linkStyles, linkActiveStyles } from '../../styles/shared-styles';
import Link from '../Link';

export const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: -8px -12px;
  list-style-type: none;
`;

export const Item = styled.li`
  margin: 8px 12px;
`;

export const ItemLink = styled(Link)`
  display: block;
  border: none;
  width: min-content;
`;

export const LabelWrapper = styled.div``;

export const Label = styled.span`
  ${linkStyles}

  ${ItemLink}:hover &,
  ${ItemLink}:focus &,
  ${ItemLink}:active & {
    ${linkActiveStyles}
  }
`;
