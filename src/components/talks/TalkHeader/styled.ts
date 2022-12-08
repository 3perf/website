import styled from 'styled-components';
import media from '../../../styles/media';
import { gridSize, sizes } from '../../../styles/variables';
import GatsbyImage from '../../Image';

export const Container = styled.div`
  font-size: ${sizes.fontLarge}px;
`;

export const Image = styled(GatsbyImage)`
  width: 100%;
  max-width: 800px;

  ${media.small`
    margin: 0 -${sizes.contentPadding}px;
    width: calc(100% + ${sizes.contentPadding}px * 2);
  `};
`;

export const Title = styled.h1`
  font-size: 2em;
  line-height: 1.2;
  margin-top: ${gridSize * 4}px;
  margin-bottom: ${gridSize * 2}px;
`;

export const Description = styled.div``;
