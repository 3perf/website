import classnames from 'classnames';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Script from '../Script';
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
        // Putting the script into <head> (using <Helmet>) because, otherwise, on a slow network,
        // it blocks rendering *in the middle of rendering*. As in, the browser renders everything till the script –
        // and then keeps the remaining part of the page blank for a few seconds.
        // Ideally, this script should live in the end of <body>, but there’s no easy way
        // to move it there automatically.
        <Helmet>
          <Script
            innerHTMLCode={`
              document.addEventListener('DOMContentLoaded', () => {
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
              })
            `}
          />
        </Helmet>
      )}
    </div>
  );
};

export default Logo;
