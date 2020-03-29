import styled from 'styled-components';
import media from '../../styles/media';
import { colors } from '../../styles/variables';
import GatsbyImage from '../Image';

export const Blocks = styled.div`
  display: grid;
  grid-gap: 36px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 36px;

  ${media.small`
    grid-template-columns: 1fr;
  `};
`;

export const PrimaryBlock = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / -1;
`;

export const SecondaryBlock = styled.div`
  grid-row: 2 / 3;

  ${media.small`
    grid-row: auto;
  `};
`;

export const Image = styled(GatsbyImage)`
  /* Because gatsby-image uses inline styles */
  display: block !important;
  max-width: 100%;
  margin-bottom: 12px;
  border: 5px solid ${colors.brightYellow};

  ${media.small`
    max-width: 500px;
    width: 100%;
  `};
`;
