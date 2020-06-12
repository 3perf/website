import * as React from 'react';
import NavBase, { NavBaseProps } from '../NavBase';

const Nav = (props: NavBaseProps) => (
  <NavBase
    primaryItems={[
      { title: 'Services', href: '/#services' },
      { title: 'Cases', href: '/#clients' },
      { title: 'Articles', href: '/content' },
      { title: 'About us', href: '/#about' },
      { title: 'Express consulting ⚡', href: '/consulting' },
    ]}
    secondaryItems={[
      { title: 'perf@3perf.com', href: 'mailto:perf@3perf.com' },
    ]}
    {...props}
  />
);

export default Nav;
