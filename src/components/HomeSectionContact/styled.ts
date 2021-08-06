import styled from 'styled-components';
import media from '../../styles/media';
import { gridSize } from '../../styles/variables';
import Image from '../Image';

export const Container = styled.div`
  margin: 0 -60px;
  max-width: 900px;
  padding: 30px 100px 40px 60px;
  border-radius: 4px;
  background: #ffdb01;
  color: #000;
`;

export const Link = styled.a`
  font-size: 84px;
  font-weight: bold;

  color: black;
  border-bottom: none;
  text-decoration: underline;

  ${media.small`
    font-size: calc(10vw);
  `};
`;

export const PromptContainer = styled.div`
  margin-top: ${gridSize * 6}px;
`;

export const Contact = styled.span`
  white-space: nowrap;
`;

export const ContactImage = styled(Image)`
  border-radius: 50%;
  /* -5px is hand-picked for better visual alignment */
  vertical-align: -5px;
`;
