import * as React from 'react';
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

class Layout extends React.Component<LayoutProps> {
  public render() {
    const { children } = this.props;
    return (
      <div>
        <GlobalStyle />
        {children}
      </div>
    );
  }
}

export default Layout;
