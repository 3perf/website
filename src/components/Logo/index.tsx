'use client';

import classnames from 'classnames';
import { useRef } from 'react';
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
  const logoSvgRef = useRef<HTMLDivElement>(null);

  const playAnimation = () => {
    const letters = Array.from(
      logoSvgRef.current?.querySelectorAll('#perf-letters path') ?? [],
    );
    for (const [index, letter] of letters.entries()) {
      letter.animate(
        [
          { transform: 'translateY(0)' },
          { transform: 'translateY(-3px)' },
          { transform: 'translateY(0)' },
        ],
        {
          duration: 150,
          easing: 'ease-in-out',
          delay: index * 30,
          iterations: 1,
        },
      );
    }
  };

  return (
    <div ref={logoSvgRef}>
      <LogoSvg
        className={classnames(className, 'js--site-logo')}
        $color={logoKind === LogoKind.Black ? 'black' : 'white'}
        // isAnimationPlaying={animationEnabled}
        onClick={isPlayful ? playAnimation : undefined}
        onMouseEnter={isPlayful ? playAnimation : undefined}
      />
    </div>
  );
};

export default Logo;
