import styled from 'styled-components';
import _BlogFooterAccordion from '../../components/BlogFooterAccordion';
import _Footer from '../../components/Footer';
import _Nav from '../../components/Nav';
import codeHighlightStyles from '../../styles/code-highlight-styles';
import media from '../../styles/media';
import { anyPlusAny } from '../../styles/mixins';
import { linkActiveStyles, linkStyles } from '../../styles/shared-styles';
import { colors, gridSize, sizes } from '../../styles/variables';

export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 7}px;
  font-size: 16px;
`;

export const Header = styled.header`
  margin-bottom: ${gridSize * 5}px;
`;

export const Meta = styled.div`
  margin-top: ${gridSize * 2}px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 60px;
  font-weight: 900;
  line-height: 1;
`;

export const Content = styled.article`
  font-family: 'Merriweather', Georgia, serif;
  max-width: 600px;

  /* Headers */
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
    font-weight: 900;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.17em;
  }

  /* Images & video */
  a.gatsby-resp-image-link {
    ${linkStyles}

    border: 1px solid #ccc;

    &:hover,
    &:focus,
    &:active {
      ${linkActiveStyles}
    }
  }

  .gatsby-resp-image-wrapper {
    width: clamp(100%, 80vw, 900px);
  }

  .sidenote .custom-block-heading .gatsby-resp-image-wrapper,
  .note .gatsby-resp-image-wrapper {
    width: unset;
  }

  video {
    max-width: 100%;
  }

  /* Lists */
  ul {
    list-style: none;
    padding-left: 32px;
  }

  p + div.list-wrapper_oneline {
    margin-top: -${sizes.paragraphSpacing / 2}px;
  }

  div.list-wrapper_oneline li {
    margin: 0;
  }

  div.list-wrapper_multiparagraph li {
    margin-bottom: ${sizes.paragraphSpacing * 2.5}px;
  }

  /* Code highlighting */
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
  }

  ${codeHighlightStyles}

  /* Sidenote */
  ${media.notMedium`
    .sidenote {
      position: relative;
    }

    .sidenote .custom-block-heading {
      position: absolute;
      top: 0;
      right: 0;
      transform: translateX(calc(100% + 48px));
      width: 300px;
      font-size: 13px;
    }
  `}

  ${media.medium`
    .sidenote {
      display: flex;
      flex-direction: column-reverse;
    }

    .sidenote .custom-block-heading {
      background: ${colors.softYellow};
      margin: ${sizes.paragraphSpacing}px -${gridSize * 2}px 0;
      padding: ${gridSize}px ${gridSize * 2}px;

      font-size: ${sizes.fontSmall}px;

      &::before {
        content: 'Sidenote: ';
        font-weight: bold;
      }
    }
  `}

  /* Random */
  ${anyPlusAny('p', '.custom-block', '.gatsby-highlight')`
    margin-top: ${sizes.paragraphSpacing}px;
  `}

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
`;

export const BlogFooterAccordion = styled(_BlogFooterAccordion)`
  margin-top: ${sizes.paragraphSpacing * 3}px;
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 6}px;
  margin-bottom: ${gridSize * 2}px;
`;
