import * as React from 'react';
import { FC, SVGProps } from 'react';
import { Helmet } from 'react-helmet';
import { JSXChildrenProp } from '../../../types';
import { ImageWrapper, Text } from '../Slide/styled';
import {
  Container,
  Controls,
  ControlButton,
  ControlButtonState,
} from './styled';

// Icons from https://heroicons.com/. License: MIT
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
      clipRule="evenodd"
    />
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5zm4 0a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5z"
      clipRule="evenodd"
    />
  </svg>
);

const ReplayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
      clipRule="evenodd"
    />
  </svg>
);

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
    <Container
      // idle | running | paused | finished, to mimic https://developer.mozilla.org/en-US/docs/Web/API/Animation/playState
      data-animation-state="idle"
      className={className}
      id={slideId}
    >
      <div>
        <ImageWrapper
          href={`#${slideId}`}
          useImageBorder={useImageBorder}
          isSectionHeader={isSectionHeader}
        >
          <Svg
            data-svg-animation
            style={{
              height: 'auto',
              display: 'block',
            }}
            viewBox="0 0 1280 720"
          />
        </ImageWrapper>
        {hasControls && (
          <Controls>
            <ControlButton data-control-button>
              <ControlButtonState data-control-button-state="play">
                <PlayIcon /> Play
              </ControlButtonState>
              <ControlButtonState data-control-button-state="pause">
                <PauseIcon /> Pause
              </ControlButtonState>
              <ControlButtonState data-control-button-state="replay">
                <ReplayIcon /> Replay
              </ControlButtonState>
            </ControlButton>
          </Controls>
        )}
      </div>
      <Text isSectionHeader={isSectionHeader}>{children}</Text>
      <Helmet>
        <script>
          {`
          (function() {
            function initAnimation() {
              const containerNode = document.querySelector('#${slideId}');
              const svgNode = containerNode.querySelector('[data-svg-animation]');
              const animatedElements = [...svgNode.querySelectorAll('g g')];

              function rewindAnimation() {
                animatedElements.forEach(function(element) {
                  element.getAnimations().forEach(function(animation) {
                    animation.currentTime = 0;
                  });
                });
              }

              function setAnimationState(animationState) {
                containerNode.dataset.animationState = animationState;

                animatedElements.forEach(function(element) {
                  element.style.animationPlayState = animationState === 'running' ? 'running' : 'paused';
                });
              }

              // Start the animation if necessary
              if (${JSON.stringify(autoplay)} === 'on-viewport-entry') {
                const threshold = 1;
                const observer = new IntersectionObserver(
                  function(entries) {
                    entries.forEach(function(entry) {
                      if (entry.isIntersecting) {
                        setAnimationState('running');

                        // Don’t trigger the animation anymore, even if the user scrolls back up
                        observer.unobserve(entry.target);
                      }
                    });
                  },
                  { threshold },
                );

                observer.observe(svgNode);
              } else if (${JSON.stringify(autoplay)} === 'enabled') {
                setAnimationState('running');
              }

              // Switch the button to “Replay” when the animation is finished
              animatedElements.forEach(function(element) {
                element.addEventListener('animationend', function() {
                  const allAnimationsFinished = animatedElements.every(function(element) {
                    return element.getAnimations().every(function(animation) {
                      return animation.playState === 'finished';
                    });
                  });

                  if (allAnimationsFinished) {
                    setAnimationState('finished');
                  }
                });
              });

              // Make buttons interactive
              containerNode.querySelector('[data-control-button]')?.addEventListener('click', function() {
                const animationState = containerNode.dataset.animationState;

                // This MUST mimic styles in styled.ts
                if (animationState === 'idle') {
                  setAnimationState('running');
                } else if (animationState === 'running') {
                  setAnimationState('paused');
                } else if (animationState === 'paused') {
                  setAnimationState('running');
                } else if (animationState === 'finished') {
                  rewindAnimation();
                  setAnimationState('running');
                }
              });
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
