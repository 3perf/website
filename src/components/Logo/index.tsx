import invariant from 'invariant';
import * as React from 'react';
import { LogoSvg } from './styled';

interface LogoProps {
  className?: string;
  logoKind?: LogoKind;
  isPlayful?: boolean;
}

export enum LogoKind {
  Black,
  White,
}

const Logo = ({
  logoKind = LogoKind.Black,
  isPlayful = false,
  className,
}: LogoProps) => {
  const [isAnimationPlaying, setAnimationPlaying] = React.useState(false);

  const playAnimation = React.useCallback(() => {
    setAnimationPlaying(true);
  }, [setAnimationPlaying]);

  // This callback listens to all animationEnd events
  // and removes the animation as soon as the last element’s animation completes
  const stopAnimationIfAllDone = React.useCallback(
    (event: React.AnimationEvent<SVGElement>) => {
      const target = event.target as SVGPathElement;

      invariant(target.parentNode, 'event.target doesn’t have a parent node');
      if (target === target.parentNode.lastChild) {
        setAnimationPlaying(false);
      }
    },
    [setAnimationPlaying],
  );

  const animationProps = {
    onMouseEnter: playAnimation,
    onClick: playAnimation,
    onAnimationEnd: stopAnimationIfAllDone,
  };

  return (
    <LogoSvg
      className={className}
      color={logoKind === LogoKind.Black ? 'black' : 'white'}
      enableAnimation={isAnimationPlaying}
      {...(isPlayful ? animationProps : {})}
    />
  );
};

export default Logo;
