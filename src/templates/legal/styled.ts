import styled, { css } from 'styled-components';
import _Footer from '../../components/Footer';
import _Nav from '../../components/Nav';
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

export const RelatedLinks = styled.div`
  margin: ${gridSize * 6}px 0 0 ${-gridSize * 3}px;
  padding: ${gridSize * 2}px ${gridSize * 3}px ${gridSize * 2}px;
  width: fit-content;
  background: ${colors.softYellow};
  border-radius: 4px;
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

  ul {
    list-style-type: '— ';
  }

  /* Duplicating the class to increase specificity */
  p + .list_compact.list_compact,
  p + .list_compact.list_compact {
    margin-top: ${sizes.paragraphSpacing / 2}px;
  }

  .list_compact li + li {
    margin-top: 0;
  }

  .list_spread li + li {
    margin-top: ${sizes.paragraphSpacing}px;
  }
`;

export const Content = styled.article`
  font-family: 'Merriweather', Georgia, serif;
  max-width: 600px;

  ${headerStyles}

  ${listStyles}

  /* Random */
  *:is(p, .custom-block, .gatsby-highlight, ul, ol) + *:is(p, .custom-block, .gatsby-highlight, ul, ol) {
    margin-top: ${sizes.paragraphSpacing}px;
  }

  blockquote {
    margin: ${sizes.paragraphSpacing}px 0 ${sizes.paragraphSpacing * 2}px
      ${-gridSize * 3}px;
    font-family: Montserrat, sans-serif;
    padding: ${gridSize * 2}px ${gridSize * 3}px ${gridSize * 2}px;
    background: ${colors.softYellow};
    border-radius: 4px;
  }
`;
