import * as React from 'react';
import NavBase, { NavBaseProps } from '../NavBase';

const Nav = (props: NavBaseProps) => (
  <NavBase
    primaryItems={[
      { title: 'Services', href: '/#services' },
      { title: 'Client Stories', href: '/#clients' },
      { title: 'Case Studies & Guides', href: '/content' },
      { title: 'About Us', href: '/#about' },
    ]}
    secondaryItems={[
      { title: 'perf@3perf.com', href: 'mailto:perf@3perf.com' },
    ]}
    {...props}
  />
);

export default Nav;
