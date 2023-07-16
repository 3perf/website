import { Suspense } from 'react';
import { JSXChildrenProp } from '../../types';
import { GlobalStyle } from './GlobalStyle';

interface LayoutProps {
  children: JSXChildrenProp;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    // Using <Suspense> to enable concurrent hydration and improve TBT
    <Suspense>
      <div>
        <GlobalStyle />
        {children}
      </div>
    </Suspense>
  );
};

export default Layout;
