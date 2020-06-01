import styled from 'styled-components';
import _Footer from '../../components/Footer';
import _Nav from '../../components/Nav';
import codeHighlightStyles from '../../styles/code-highlight-styles';
import { anyPlusAny } from '../../styles/mixins';
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

const printBorderColor = 'black';

export const Content = styled.article`
  font-family: 'Merriweather', Georgia, serif;
  max-width: 600px;

  @media print {
    max-width: none;
    font-size: ${sizes.fontSmall}px;
  }

  ${codeHighlightStyles}

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

    @media print {
      page-break-after: avoid;
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

  code[class*='language-'] {
    @media print {
      word-wrap: break-word;
      /* Chrome excludes backgrounds by default, so let’s optimize
         for the non-background UI */
      background: unset;
      padding: 0;
    }
  }

  .image-container {
    /* Reset figure styles */
    margin: 0;
  }

  .image-container img {
    /* Define the default value – sometimes, it will be overwritten by inline styles */
    --max-width-from-options: 100%;
    max-width: min(var(--max-width-from-options), 100%);
    height: auto;
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

  .table-container {
    overflow: auto;

    @media print {
      overflow: unset;
    }
  }

  table {
    text-align: left;
    border-collapse: collapse;

    @media print {
      width: 100%;
      table-layout: fixed;
      page-break-inside: avoid;
    }

    th,
    td {
      border: 1px solid #ccc;
      padding: ${gridSize / 2}px ${gridSize}px;
      vertical-align: baseline;

      @media print {
        border-color: ${printBorderColor};
      }
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

      /* Chrome excludes backgrounds by default, so let’s optimize
         for the non-background UI */
      background: unset;
      margin-left: 0;
      margin-right: 0;
      border: 1px solid ${printBorderColor};
      border-radius: 0;
      width: fit-content;
      page-break-inside: avoid;

      > pre[class*='language-'],
      > pre[class*='language-'] > code {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }

  ${anyPlusAny('p', '.table-container', '.gatsby-highlight')`
    margin-top: ${sizes.paragraphSpacing}px;
  `}

  mark {
    background: ${colors.softYellow};
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

    li {
      margin-top: ${gridSize}px;
    }

    > ul {
      padding-left: 0;
    }

    > ul > li:first-child {
      margin-top: 0;
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

    @media print {
      /* Chrome excludes backgrounds by default, so let’s optimize
         for the non-background UI */
      background: none;
      margin-left: 0;
      margin-right: 0;
      border: 1px dotted ${printBorderColor};
      border-radius: 0;
      page-break-inside: avoid;
    }
  }
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 6}px;
  margin-bottom: ${gridSize * 2}px;

  @media print {
    display: none;
  }
`;
