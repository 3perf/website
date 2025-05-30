import styled, { css } from 'styled-components';
import _BlogFooterAccordion from '../../components/BlogFooterAccordion';
import _Footer from '../../components/Footer';
import _MailchimpSubscribe from '../../components/MailchimpSubscribe';
import _Nav from '../../components/Nav';
import codeHighlightStyles from '../../styles/code-highlight-styles';
import media from '../../styles/media';
import { colors, gridSize, sizes } from '../../styles/variables';

//////////////////////////////////////////////////////////////////////
// React blocks
export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 7}px;
  font-size: 16px;
`;

export const Header = styled.header`
  margin-bottom: ${gridSize * 5}px;
`;

export const TopMeta = styled.div`
  margin-top: ${gridSize * 2}px;
`;

export const BottomMeta = styled.div`
  margin-top: ${gridSize * 4}px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 60px;
  font-weight: 900;
  line-height: 1;

  ${media.small`
    font-size: 40px;
  `}
`;

export const MailchimpSubscribe = styled(_MailchimpSubscribe)`
  margin: ${gridSize * 6}px -${gridSize * 3}px;
  max-width: 600px;
  padding: ${gridSize * 2}px ${gridSize * 3}px;
  border-radius: 4px;
  background: ${colors.softYellow};
`;

export const BlogFooterAccordion = styled(_BlogFooterAccordion)`
  margin-top: ${sizes.paragraphSpacing * 3}px;
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 6}px;
  margin-bottom: ${gridSize * 2}px;
`;

//////////////////////////////////////////////////////////////////////
// Markdown content

// Header styles
const headerStyles = css`
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
    font-size: 32px;
    font-weight: 900;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
  }
`;

// List styles
const listStyles = css`
  ol,
  ul {
    margin: 0;
    padding-left: 32px;
  }

  /* Duplicating the class to increase specificity */
  p + .list_compact.list_compact,
  .list_compact.list_compact + p {
    margin-top: ${sizes.paragraphSpacing / 2}px;
  }

  .list_compact li + li {
    margin-top: 0;
  }

  .list_spread li + li {
    margin-top: ${sizes.paragraphSpacing}px;
  }
`;

// Media styles
const mediaStyles = css`
  .media-container {
    /* Reset figure styles */
    margin: 0;
  }

  .media-container img,
  .media-container video {
    /* clamp(100%, 80vw, 900px) won’t work for scrollable images.
     * In scrollable images on wide screens,
     * 100% is more than 900px, and clamp() returns 100% */
    width: min(max(100%, 80vw), 900px);
    height: auto;
  }

  .sidenote__heading .media-container img,
  .note .media-container img {
    width: 100%;
  }

  .media-container__caption {
    font-size: ${sizes.fontSmall}px;
    font-style: italic;
    margin-top: ${gridSize / 2}px;

    em {
      font-style: normal;
    }
  }

  .media-container_scrollable {
    width: 100vw;
    overflow-x: auto;
    margin-left: -${sizes.contentPadding}px;
    margin-right: -${sizes.contentPadding}px;
    padding-left: ${sizes.contentPadding}px;
    padding-right: ${sizes.contentPadding}px;

    /* On mobile, make it more obvious that image content is scrollable */
    &::-webkit-scrollbar {
      height: 4px;
      background: #eee;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
  }
`;

// Gatsby highlight
const gatsbyHighlightStyles = css`
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

    &[data-word-wrap] {
      > pre,
      > pre > code {
        white-space: pre-wrap;
        overflow-wrap: break-word;
      }
    }
  }
`;

// Sidenote styles
const sidenoteWidth = 300;
const sidenoteMargin = 48;
const sidenoteStyles = css`
  /* Reset blockquote styles */
  .sidenote__heading {
    margin: unset;
    font-style: unset;
    padding: unset;
    border: unset;
  }

  ${media.notMedium`
    .sidenote {
      display: flex;
      align-items: baseline;
      width: calc(100% + ${sidenoteWidth}px + ${sidenoteMargin}px);
    }

    /* Bring text’s width back to 100% */
    .sidenote__body {
      width: calc(100% - ${sidenoteWidth}px - ${sidenoteMargin}px);
    }

    .sidenote__heading {
      /* Position the sidenote to the right of the text */
      margin-left: ${sidenoteMargin}px;
      width: ${sidenoteWidth}px;
      font-size: ${sizes.fontSmall}px;
      /* Set height to 0 to avoid pushing primary content down */
      height: 0;
    }

    .sidenote__remark {
      display: none;
    }
  `}

  ${media.medium`
    .sidenote__heading {
      background: ${colors.softYellow};
      margin: ${sizes.paragraphSpacing}px -${gridSize * 2}px 0;
      padding: ${gridSize}px ${gridSize * 2}px;

      font-size: ${sizes.fontSmall}px;
    }
  `}
`;

// TOC styles
const tocStyles = css`
  .toc {
    background: ${colors.softYellow};
    width: fit-content;
    margin: ${sizes.paragraphSpacing}px -${gridSize * 2}px;
    padding: ${gridSize * 1.5}px ${gridSize * 5}px ${gridSize * 2}px
      ${gridSize * 2}px;
    font-size: ${sizes.fontSmall}px;
    border-radius: 2px;
    font-family: 'Montserrat', sans-serif;

    &.toc_with-header {
      margin: ${gridSize * 4}px -${gridSize * 2}px;
      padding: ${gridSize * 2}px ${gridSize * 5}px ${gridSize * 3}px
        ${gridSize * 2}px;
    }

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

    /* Collapse intermediate levels of TOC if e.g. we nest h3 inside h1 */
    ul:has(> li:only-child > ul:only-child) {
      padding-left: 0;
    }

    /* Overwrite default p + ul styles */
    *:is(p, ul) + *:is(p, ul) {
      margin-top: 0 !important;
    }
  }

  .toc__header {
    margin: 0 0 ${gridSize}px;
    font-size: 26px;
  }
`;

// Note styles
const noteStyles = css`
  .note {
    /* Unset blockquote styles */
    margin: unset;
    padding: unset;
    border: unset;
    font-style: unset;

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
`;

export const Content = styled.article<{ formatting?: { roundImageBorder?: boolean } }>`
  font-family: system-ui, sans-serif;
  max-width: 600px;

  ${headerStyles}

  ${mediaStyles}

  ${listStyles}

  ${gatsbyHighlightStyles}

  ${codeHighlightStyles}

  ${sidenoteStyles}

  ${tocStyles}

  ${noteStyles}

  /* Random */
  *:is(p, .note, .sidenote, .gatsby-highlight, ul, ol, .media-container) + *:is(p, .note, .sidenote, .gatsby-highlight, ul, ol, .media-container) {
    margin-top: ${sizes.paragraphSpacing}px;
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

  mark {
    background: ${colors.softYellow};
  }

  hr {
    margin-top: 32px;
    margin-bottom: 32px;
    border: none;
    position: relative;

    &::after {
      content: '· · ·';
      text-align: center;
      width: 100%;
      display: block;
      color: #999;
      letter-spacing: 5px;
      user-select: none;
    }
  }

  ${({ formatting }) =>
    formatting?.roundImageBorder &&
    css`
      .media-container img {
        border-radius: 2px;
      }
    `}
`;
