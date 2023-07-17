import { keyframes, styled } from 'styled-components';
import { JSXChildrenProp } from '../../types';

const marquee = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const MarqueeContainer = styled.div`
  max-width: 100%;
`;

const MarqueeAnimation = styled.div<{ $duration: number }>`
  display: inline-block;
  white-space: nowrap;
  animation: ${marquee} ${(props) => props.$duration}s linear infinite;
`;

const MarqueeWrapper = styled.div`
  display: inline-block;
`;

const Marquee = ({
  className,
  duration,
  children,
}: {
  className?: string;
  duration: number;
  children: JSXChildrenProp;
}) => {
  return (
    <MarqueeContainer className={className}>
      <MarqueeAnimation $duration={duration}>
        <MarqueeWrapper>{children}</MarqueeWrapper>
        <MarqueeWrapper>{children}</MarqueeWrapper>
      </MarqueeAnimation>
    </MarqueeContainer>
  );
};

export default Marquee;
