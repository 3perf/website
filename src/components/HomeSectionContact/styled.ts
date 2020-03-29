import styled from 'styled-components';
import media from '../../styles/media';
import { linkActiveStyles, linkStyles } from '../../styles/shared-styles';

export const Container = styled.div`
  text-align: center;
`;

export const Link = styled.a`
  font-size: 84px;
  font-weight: bold;

  color: black;
  border-bottom-color: rgba(0, 0, 0, 0.25);

  ${media.small`
    font-size: calc(10vw);
  `};
`;
