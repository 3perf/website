import styled from 'styled-components';
import media from '../../styles/media';
import { colors } from '../../styles/variables';

export const Container = styled.div`
  padding-bottom: 60px;
  border-bottom: 5px dotted ${colors.brightYellow};
`;

export const Blockquote = styled.blockquote`
  display: flex;
  margin: 0;

  ${media.small`
    flex-direction: column;
  `}
`;

export const BlockquoteText = styled.p`
  position: relative;

  flex: 3;
  margin-right: 36px;

  font-size: 32px;

  &::before {
    content: '“';
    position: absolute;
    color: ${colors.brightYellow};
    font-size: 120px;
    z-index: -1;
    font-weight: 900;
    top: -50px;
    left: -40px;
  }

  ${media.small`
    margin-right: 0;
    font-size: 24px;
  `}
`;

export const BlockquoteFooter = styled.footer`
  flex: 1;

  ${media.small`
    margin-top: 24px;
  `}
`;

const horizontalGap = 64;
const verticalGap = 24;
export const Logos = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: -${verticalGap / 2}px -${horizontalGap / 2}px;
  margin-top: ${60 - verticalGap / 2}px;
`;

export const Logo = styled.img`
  margin: ${verticalGap / 2}px ${horizontalGap / 2}px;
`;
