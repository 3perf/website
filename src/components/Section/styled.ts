import styled from 'styled-components';
import media from '../../styles/media';

export const H2 = styled.h2`
  margin: 0 0 24px;
  font-size: 48px;
  line-height: 1.2;

  ${media.small`
    font-size: 32px;
  `};
`;

export const Content = styled.div`
  padding-top: 12px;
`;
