import styled from 'styled-components';
import media from '../../styles/media';
import { gridSize } from '../../styles/variables';
import _Image from '../Image';
import _Link from '../Link';
import factoidBackground from './factoid-bg.svg';

export const Intro = styled.div`
  margin-bottom: ${gridSize * 2}px;
`;

export const Image = styled(_Image)`
  max-width: 600px;
`;

export const Primary = styled.div``;
export const Links = styled.div`
  ${media.small`
    display: none;
  `}
`;

export const Wrapper = styled.div`
  ${media.notSmall`
    display: flex;

    ${Primary} {
      flex: 7;
      margin: 0 60px 24px 0;
    }

    ${Links} {
      flex: 4;
    }
  `}
`;

export const LinkWrapper = styled.div`
  margin-bottom: ${gridSize}px;
`;

export const Link = styled(_Link)``;

export const Factoid = styled.div`
  width: 150px;
  height: 150px;
  margin-top: ${gridSize * 3}px;
  padding: 30px;
  border-radius: 50%;
  background: url(${factoidBackground});
  background-size: cover;
  background-position: center;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 12px;
`;

export const Number = styled.div`
  font-weight: 900;
  font-size: 32px;
`;
