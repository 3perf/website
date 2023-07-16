'use client';

import { SVGProps, useEffect, useRef, useState } from 'react';
import { JSXChildrenProp } from '../../../types';
import { ImageWrapper, Text } from '../Slide/styled';
import { Container, Controls, ControlButton } from './styled';

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
  svg: React.ReactElement<SVGProps<SVGSVGElement>>;
  children: JSXChildrenProp;
  className?: string;
  useImageBorder?: boolean;
  isSectionHeader?: boolean;
  hasControls?: boolean;
  autoplay?: 'on-viewport-entry' | 'enabled' | 'disabled';
}

const AnimatedSlide = ({
  slideId,
  svg,
  children,
  className,
  useImageBorder = false,
  isSectionHeader = false,
  hasControls = false,
  autoplay = 'on-viewport-entry',
}: SlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [animationState, setAnimationState] = useState<AnimationPlayState>(
    autoplay === 'enabled' ? 'running' : 'idle',
  );

  useEffect(() => {
    getAnimatedElements().forEach(function (element) {
      element.style.animationPlayState =
        animationState === 'running' ? 'running' : 'paused';
    });
  }, [animationState]);

  // Init the intersection observer if needed
  useEffect(() => {
    if (autoplay !== 'on-viewport-entry') return;
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimationState('running');

            // Don’t trigger the animation anymore, even if the user scrolls back up
            observer.disconnect();
          }
        });
      },
      { threshold: 1 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  function getAnimatedElements() {
    const containerNode = containerRef.current;
    if (!containerNode) return [];

    const svgNode = containerNode.querySelector('[data-svg-container]');
    if (!svgNode) return [];

    const animatedElements: SVGGElement[] = Array.from(
      svgNode.querySelectorAll('g g') ?? [],
    );

    return animatedElements;
  }

  function rewindAnimation() {
    getAnimatedElements().forEach(function (element) {
      element.getAnimations().forEach(function (animation) {
        animation.currentTime = 0;
      });
    });
  }

  return (
    <Container ref={containerRef} className={className} id={slideId}>
      <div
        // The onAnimationEnd event bubbles up from the svg element
        onAnimationEnd={() => {
          const allAnimationsFinished = getAnimatedElements().every((element) =>
            element.getAnimations().every(function (animation) {
              return animation.playState === 'finished';
            }),
          );

          if (allAnimationsFinished) {
            setAnimationState('finished');
          }
        }}
      >
        <ImageWrapper
          data-svg-container
          href={`#${slideId}`}
          $useImageBorder={useImageBorder}
          $isSectionHeader={isSectionHeader}
        >
          {svg}
        </ImageWrapper>
        {hasControls && (
          <Controls>
            <ControlButton
              onClick={() => {
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
              }}
            >
              {getControlButtonContents(animationState)}
            </ControlButton>
          </Controls>
        )}
      </div>
      <Text $isSectionHeader={isSectionHeader}>{children}</Text>
    </Container>
  );
};

function getControlButtonContents(animationState: AnimationPlayState) {
  if (animationState === 'idle' || animationState === 'paused') {
    return (
      <>
        <PlayIcon /> Play
      </>
    );
  }

  if (animationState === 'running') {
    return (
      <>
        <PauseIcon /> Pause
      </>
    );
  }

  if (animationState === 'finished') {
    return (
      <>
        <ReplayIcon /> Replay
      </>
    );
  }

  throw new Error(`Unknown animation state: ${animationState}`);
}

export default AnimatedSlide;
