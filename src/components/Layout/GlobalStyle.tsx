'use client';

import { createGlobalStyle } from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../styles/shared-styles';
import { colors, sizes } from '../../styles/variables';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Magnet Headline Upright';
    src: url('/fonts/MagnetTRIALHead-Upright.otf') format('opentype');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet Headline Slanted';
    src: url('/fonts/MagnetTRIALHead-Slanted.otf') format('opentype');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet Headline Backslanted';
    src: url('/fonts/MagnetTRIALHead-Backslanted.otf') format('opentype');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-Light.otf') format('opentype');
    font-style: normal;
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-LightItalic.otf') format('opentype');
    font-style: italic;
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-Regular.otf') format('opentype');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-Italic.otf') format('opentype');
    font-style: italic;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-Medium.otf') format('opentype');
    font-style: normal;
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-MediumItalic.otf') format('opentype');
    font-style: italic;
    font-weight: 500;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-Bold.otf') format('opentype');
    font-style: normal;
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-BoldItalic.otf') format('opentype');
    font-style: italic;
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-Black.otf') format('opentype');
    font-style: normal;
    font-weight: 900;
    font-display: swap;
  }

  @font-face {
    font-family: 'Magnet';
    src: url('/fonts/MagnetTRIAL-BlackItalic.otf') format('opentype');
    font-style: italic;
    font-weight: 900;
    font-display: swap;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    --font-heading: 'Magnet', sans-serif;
    --font-body: 'Magnet', sans-serif;

    font-family: var(--font-body);
    overflow-x: hidden;

    --link-color: #06c;
    --link-border-color: rgba(0, 102, 204, 0.25);
    --link-active-color: #d04000;
    --link-active-border-color: rgba(208, 64, 0, 0.25);
  }

  body {
    margin: 0;
    font-size: 16px;
    line-height: 1.4;
    overflow: hidden;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-heading);
  }

  a {
    ${linkStyles}
  }

  a:hover,
  a:focus,
  a:active {
    ${linkActiveStyles}
  }

  code,
  pre {
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;
  }

  code {
    background: ${colors.codeBackground};
    padding: 0 3px;
    border-radius: 2px;
  }

  p {
    margin: 0;

    & + & {
      margin-top: ${sizes.paragraphSpacing}px;
    }
  }

  li {
    margin: 0;

    & + & {
      margin-top: ${sizes.paragraphSpacing}px;
    }
  }
`;
