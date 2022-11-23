import classnames from 'classnames';
import * as React from 'react';
import { Helmet } from 'react-helmet';
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
  return (
    <div>
      <LogoSvg
        className={classnames(className, 'js--site-logo')}
        color={logoKind === LogoKind.Black ? 'black' : 'white'}
      />
      {isPlayful && (
        <Helmet>
          <script>
            {`
              function initLogoAnimation() {
                const playAnimation = () => document.querySelector('.js--site-logo').classList.add('js--site-logo_animation-enabled');
                const stopAnimation = () => document.querySelector('.js--site-logo').classList.remove('js--site-logo_animation-enabled');
                // This callback listens to all animationEnd events
                // and removes the animation as soon as the last element’s animation completes
                const stopAnimationIfAllDone = (event) => {
                  const target = event.target;

                  if (target === target.parentNode.lastChild) {
                    stopAnimation();
                  }
                }

                document.querySelector('.js--site-logo').addEventListener('click', playAnimation);
                document.querySelector('.js--site-logo').addEventListener('mouseenter', playAnimation);
                document.querySelector('.js--site-logo').addEventListener('animationend', stopAnimationIfAllDone);
              }

              if (document.readyState === 'loading')
                document.addEventListener('DOMContentLoaded', initLogoAnimation)
              else
                initLogoAnimation()
            `}
          </script>
        </Helmet>
      )}
    </div>
  );
};

export default Logo;
