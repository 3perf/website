import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import media from '../../../styles/media';
import { gridSize, sizes } from '../../../styles/variables';

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
  margin-top: ${gridSize * 4}px;
  margin-bottom: ${gridSize * 2}px;
`;

export const Description = styled.div`
  font-family: 'Merriweather', Georgia, serif;
`;

export const Meta = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: ${gridSize * 4}px;
  border-radius: 16px;

  background: #f5f5f5;
  padding: ${gridSize}px 0;
`;

export const MetaChild = styled.div`
  margin: ${gridSize}px ${gridSize * 4}px;
`;

export const Authors = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: -${gridSize / 2}px;

  > * {
    margin: ${gridSize / 2}px;
  }
`;

export const AuthorWrapper = styled.div``;

export const Date = styled.div`
  font-size: 0.75em;
`;
