import { Inner, Link, Outer } from './styled';

interface CallToActionProps {
  className?: string;
}

const CallToAction = ({ className }: CallToActionProps) => (
  <Outer className={className}>
    <Inner>
      We can help you make your app or site faster.{' '}
      <Link href="mailto:perf@3perf.com">Contact us</Link>
    </Inner>
  </Outer>
);

export default CallToAction;
