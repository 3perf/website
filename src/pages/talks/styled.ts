import styled from 'styled-components';
import _Footer from '../../components/Footer';
import _Nav from '../../components/Nav';
import _AnimatedSlide from '../../components/talks/AnimatedSlide';
import _LiveDemo from '../../components/talks/LiveDemo';
import _SectionHeader from '../../components/talks/SectionHeader';
import _Slide from '../../components/talks/Slide';
import media from '../../styles/media';
import { colors, gridSize, sizes } from '../../styles/variables';

export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 4}px;
  font-size: 16px;
`;

export const Slides = styled.div`
  margin-top: ${gridSize * 10}px;
`;

export const Slide = styled(_Slide)`
  margin-top: ${(props) =>
    props.isSectionHeader ? gridSize * 8 : gridSize * 6}px;
`;

export const AnimatedSlide = styled(_AnimatedSlide)`
  margin-top: ${gridSize * 6}px;
`;

export const BlockImage = styled.img`
  display: block;
`;

export const BlockVideo = styled.video`
  display: block;
`;

export const SectionHeader = styled(_SectionHeader)`
  margin: ${gridSize * 6}px 0 ${gridSize * 1.5}px;

  + ${Slide} {
    margin-top: 0;
  }
`;

export const Blockquote = styled.blockquote`
  margin: ${gridSize * 3}px ${gridSize * 5}px;
  margin-right: 0;
  font-style: italic;
  font-size: 1.25em;
`;

export const ToBeContinued = styled.div`
  margin-top: ${gridSize * 10}px;
  padding: ${gridSize * 3}px ${gridSize * 5}px ${gridSize * 4}px;
  border-radius: 8px;
  background: black;
  color: white;

  > p > strong {
    color: ${colors.brightYellow};
  }

  ${media.small`
    padding: ${gridSize * 2}px ${gridSize * 3}px ${gridSize * 3}px;
  `};
`;

export const Footnote = styled.div`
  margin-top: ${gridSize * 5}px;
  padding: ${gridSize * 3}px ${gridSize * 4}px ${gridSize * 3}px;
  border-radius: 8px;
  background: ${colors.softYellow};
  max-width: 600px;
  border: 1px solid black;

  mark {
    background: ${colors.brightYellow};
  }

  a {
    --link-color: black;
    --link-border-color: rgba(0, 0, 0, 0.25);
  }

  ${media.small`
    padding: ${gridSize * 2}px ${gridSize * 3}px ${gridSize * 3}px;
  `};
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 6}px;
  margin-bottom: ${gridSize * 2}px;
`;

export const Video = styled.video`
  display: block;
`;

export const Contents = styled.div`
  margin-top: ${sizes.paragraphSpacing}px;
  font-size: small;

  ol,
  li {
    margin-top: 0;
    margin-bottom: 0;
  }

  ol {
    counter-reset: item;
    padding-left: ${gridSize * 2.5}px;
  }

  li {
    display: block;
  }

  li:before {
    content: counters(item, '.') '. ';
    counter-increment: item;
  }
`;

export const ContentsInner = styled.div`
  columns: 2 200px;
`;

export const LiveDemo = styled(_LiveDemo)`
  margin-top: ${gridSize * 6}px;
`;

export const Mark = styled.mark`
  background: ${colors.softYellow};
`;

export const SmallParagraph = styled.p`
  font-size: ${sizes.fontSmall}px;
`;
