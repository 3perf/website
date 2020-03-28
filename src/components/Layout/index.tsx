import * as React from 'react';
import Script from 'react-script-tag';
import { createGlobalStyle } from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../styles/shared-styles';
import { colors, sizes } from '../../styles/variables';
import { JSXChildrenProp } from '../../types';
import getGlobalFonts from './getGlobalFonts';

// tslint:disable-next-line no-unused-expression
const GlobalStyle = createGlobalStyle`
  ${getGlobalFonts()}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: 'Montserrat', sans-serif;
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

  a {
    ${linkStyles}
  }

  a:hover,
  a:focus,
  a:active {
    ${linkActiveStyles}
  }

  code {
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;
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

interface LayoutProps {
  children: JSXChildrenProp;
}

class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    const { children } = this.props;
    return (
      <div>
        <GlobalStyle />
        {children}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
(function(d, w, c) {
    if (window.location.pathname.startsWith('/blog')) {
        return;
    }

    w.ChatraID = 'rbqWqTkKJD2hEGTMf';
    var s = d.createElement('script');
    w[c] = w[c] || function() {
        (w[c].q = w[c].q || []).push(arguments);
    };
    s.async = true;
    s.src = 'https://call.chatra.io/chatra.js';
    if (d.head) d.head.appendChild(s);
})(document, window, 'Chatra');
`,
          }}
        />
      </div>
    );
  }
}

export default Layout;
