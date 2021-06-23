import styled from 'styled-components';
import _Footer from '../../components/Footer';
import _Nav from '../../components/Nav';
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

// prettier-ignore
export const Slide = styled(_Slide)`
  margin-top: ${props => props.isSectionHeader ? gridSize * 8 : gridSize * 6}px;
`;

export const BlockImage = styled.img`
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
  font-size: 1.5em;
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

export const MailchimpContainer = styled.div`
  margin-top: ${sizes.paragraphSpacing}px;

  input {
    margin-right: ${gridSize * 2}px;
    margin-bottom: ${gridSize}px;
    height: 32px;
    border: none;
    border-radius: 2px;
    padding: 0 12px;

    font-size: inherit;
    font-family: inherit;
  }

  button {
    height: 32px;
    padding: 0 12px;
    border-radius: 2px;

    font-size: inherit;
    font-family: inherit;

    background: #ffdb01;
    color: black;
    border: none;
  }

  // Subscription message
  > div > div:first-child {
    color: white !important;
    font-size: 0.75em;
    margin-bottom: ${gridSize / 2}px;
  }
`;

export const Footnote = styled.div`
  margin-top: ${gridSize * 5}px;
  padding: ${gridSize * 3}px ${gridSize * 4}px ${gridSize * 3}px;
  border-radius: 8px;
  background: black;
  color: white;
  max-width: 600px;

  > p > strong {
    color: ${colors.brightYellow};
  }

  a {
    --link-color: white;
    --link-border-color: rgba(255, 255, 255, 0.25);
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
