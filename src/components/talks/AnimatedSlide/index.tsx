import * as React from 'react';
import { FC, SVGProps } from 'react';
import { Helmet } from 'react-helmet';
import { JSXChildrenProp } from '../../../types';
import { Container, ImageWrapper, PlayControlButton, Text } from './styled';

interface SlideProps {
  slideId: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
  children: JSXChildrenProp;
  className?: string;
  useImageBorder?: boolean;
  isSectionHeader?: boolean;
  hasControls?: boolean;
  autoplay?: 'on-viewport-entry' | 'enabled' | 'disabled';
}

const AnimatedSlide = ({
  slideId,
  Svg,
  children,
  className,
  useImageBorder = false,
  isSectionHeader = false,
  hasControls = false,
  autoplay = 'on-viewport-entry',
}: SlideProps) => {
  return (
    <Container className={className} id={`slide${slideId}`}>
      <div>
        <ImageWrapper
          href={`#${slideId}`}
          useImageBorder={useImageBorder}
          isSectionHeader={isSectionHeader}
        >
          <Svg
            id="svg-animation"
            style={{
              height: 'auto',
              display: 'block',
            }}
            viewBox="0 0 1280 720"
          />
        </ImageWrapper>
        {hasControls && (
          <PlayControlButton id="play-control-button">Play</PlayControlButton>
        )}
      </div>
      <Text isSectionHeader={isSectionHeader}>{children}</Text>
      <Helmet>
        <script>
          {`
          (function() {
            let isPaused = ${autoplay !== 'enabled' ? 'true' : 'false'};
            let isFinished = false;
            let isFirstEntry = true;

            function initAnimation() {
              const containerNode = document.querySelector('#slide${slideId}');
              const svgNode = containerNode?.querySelector('#svg-animation');
              const animatedElements = svgNode?.querySelectorAll('g g');
              const playControlButton = containerNode?.querySelector('#play-control-button');

              function changeAnimationPlayState(isPlayStatePaused) {
                animatedElements?.forEach(function(element) {
                  element.style.animationPlayState = isPlayStatePaused ? 'paused' : 'running';
                });
                if (playControlButton) {
                  playControlButton.innerText = isPlayStatePaused ? 'Play' : 'Pause';
                }
                isPaused = isPlayStatePaused
              };
              function togglePlayState() {
                changeAnimationPlayState(!isPaused);
              };
              function restart() {
                const clonedSvgNode = svgNode.cloneNode(true);
                svgNode.parentElement.replaceChild(clonedSvgNode, svgNode);
                playControlButton.removeEventListener('click', restart);

                initAnimation();
              }

              let observer;
              if (${autoplay === 'on-viewport-entry' ? 'true' : 'false'}) {
                const threshold = 1;
                observer = new IntersectionObserver(
                  function(entries) {
                    entries.forEach(function(entry) {
                      if (entry.intersectionRatio >= threshold && isFirstEntry) {
                        togglePlayState();
                        isFirstEntry = false;
                      }
                    });
                  },
                  { threshold },
                );

                observer.observe(svgNode);
              }

              let runningAnimationsCount = animatedElements?.length ?? 0;

              function onAnimationEnd() {
                runningAnimationsCount = runningAnimationsCount - 1;

                if (runningAnimationsCount === 0) {
                  isFinished = true;
                  if (playControlButton) {
                    playControlButton.innerText = 'Replay'
                    playControlButton.removeEventListener('click', togglePlayState);
                    playControlButton.addEventListener('click', restart);
                  }
                }
              };

              animatedElements?.forEach(function(element) {
                element.addEventListener('animationend', onAnimationEnd);
              });
              if (playControlButton) {
                playControlButton.addEventListener('click', togglePlayState);
              }

              changeAnimationPlayState(isPaused);
            }
          
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initAnimation);
            } else {
              initAnimation();
            }
          })()
          `}
        </script>
      </Helmet>
    </Container>
  );
};

export default AnimatedSlide;
