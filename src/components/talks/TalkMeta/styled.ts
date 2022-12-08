import styled from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../../styles/shared-styles';
import { gridSize, sizes } from '../../../styles/variables';
import Image from '../../Image';

export const Container = styled.div`
  margin-top: ${gridSize * 3}px;
  font-size: ${sizes.fontDefault}px;
`;

export const Date = styled.time``;

export const AuthorImage = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: ${gridSize / 2}px;
  vertical-align: -7px;
`;

export const AuthorLink = styled.a`
  border: none;
`;

export const AuthorName = styled.span`
  ${linkStyles}

  ${AuthorLink}:hover &,
  ${AuthorLink}:focus &,
  ${AuthorLink}:active & {
    ${linkActiveStyles}
  }
`;
