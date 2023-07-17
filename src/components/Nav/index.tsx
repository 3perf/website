import NavBase, { NavBaseProps } from '../NavBase';

const Nav = (props: NavBaseProps) => (
  <NavBase
    primaryItems={[
      { title: 'Services', href: '/#services' },
      { title: 'Client Cases', href: '/#clients' },
      { title: 'Articles and Guides', href: '/content' },
      { title: 'About Us', href: '/#about' },
    ]}
    secondaryItems={[
      { title: 'perf@3perf.com', href: 'mailto:perf@3perf.com' },
      { title: 'book a call', href: 'https://savvycal.com/3perf/intake' },
    ]}
    {...props}
  />
);

export default Nav;
