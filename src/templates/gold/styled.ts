import styled from 'styled-components';
import _Footer from '../../components/Footer';
import _Nav from '../../components/Nav';
import codeHighlightStyles from '../../styles/code-highlight-styles';
import { linkActiveStyles, linkStyles } from '../../styles/shared-styles';
import { colors, gridSize, sizes } from '../../styles/variables';

export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 6}px;
  font-size: 16px;

  @media print {
    display: none;
  }
`;

export const HeaderContainer = styled.header<{ media: 'screen' | 'print' }>`
  margin-bottom: ${gridSize * 4}px;

  @media not ${(props) => props.media} {
    display: none;
  }
`;

export const ClientLogo = styled.img`
  display: block;
  height: 50px;
  margin-bottom: ${gridSize}px;
`;

export const Meta = styled.div`
  font-size: ${sizes.fontSmall}px;
`;

export const MetaIcon = styled.img`
  height: 1em;
  vertical-align: -1px;
`;

export const Title = styled.h1`
  margin: 0 0 ${gridSize}px;
  line-height: 1.2;
  font-weight: 900;
`;

export const PrintButton = styled.button`
  font: inherit;
  padding: 0;
  border: none;
  border-radius: 0;
  background: none;

  ${linkStyles}

  &:hover,
  &:focus,
  &:active {
    ${linkActiveStyles}
  }
`;

export const Content = styled.article`
  font-family: 'Merriweather', Georgia, serif;
  max-width: 600px;

  @media print {
    max-width: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Montserrat', sans-serif;
    margin-top: 2em;

    .anchor {
      border: none;
    }
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.17em;
  }

  a.gatsby-resp-image-link {
    ${linkStyles}

    border: 1px solid #ccc;

    &:hover,
    &:focus,
    &:active {
      ${linkActiveStyles}
    }
  }

  blockquote {
    margin: ${sizes.paragraphSpacing}px 0;
    border-left: black 5px solid;
    padding: ${gridSize * 2}px 0 ${gridSize * 3}px ${gridSize * 4}px;
    font-style: italic;

    pre,
    code {
      font-style: normal;
    }
  }

  .gatsby-highlight {
    overflow-x: auto;
    margin: 0 -${gridSize * 2}px;
    padding: ${gridSize}px ${gridSize * 2}px;
    background: ${colors.codeBackground};
    border-radius: 2px;

    > pre {
      margin: 0;
    }

    > pre > code {
      padding: 0;
      background: unset;
    }

    @media print {
      overflow: hidden;

      > pre[class*='language-'],
      > pre[class*='language-'] > code {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }

  p + .gatsby-highlight,
  .gatsby-highlight + p {
    margin-top: ${sizes.paragraphSpacing}px;
  }

  .toc {
    background: ${colors.softYellow};
    margin: ${sizes.paragraphSpacing}px -${gridSize * 2}px;
    padding: ${gridSize}px ${gridSize * 2}px;
    font-size: ${sizes.fontSmall}px;
    border-radius: 2px;
    font-family: 'Montserrat', sans-serif;

    ul {
      padding-left: ${gridSize * 3}px;
      list-style: none;
    }

    > ul {
      padding-left: 0;
    }

    li + li {
      margin-top: ${gridSize}px;
    }

    @media print {
      display: none;
    }
  }

  .note {
    background: ${colors.softYellow};
    margin: ${sizes.paragraphSpacing}px -${gridSize * 2}px;
    padding: ${gridSize}px ${gridSize * 2}px;
    font-size: ${sizes.fontSmall}px;
    border-radius: 2px;

    > .gatsby-highlight:last-child {
      /* Remove the extra spacing between the gatsby-highlight’s bottom border
         and .note’s one. */
      margin-bottom: -${gridSize}px;
    }
  }

  ${codeHighlightStyles}
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 6}px;
  margin-bottom: ${gridSize * 2}px;
`;
