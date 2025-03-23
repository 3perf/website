import NavBase, { NavBaseProps } from '../NavBase';

const Nav = (props: NavBaseProps) => (
  <NavBase
    primaryItems={[
      { title: 'Talks and Case Studies', href: '/' },
      { title: 'Workshops', href: '/workshops' },
    ]}
    secondaryItems={[
      { title: 'perf@3perf.com', href: 'mailto:perf@3perf.com' },
    ]}
    {...props}
  />
);

export default Nav;
