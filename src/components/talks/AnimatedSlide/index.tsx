import * as React from 'react';
import { useRef, useState, useEffect, FC, SVGProps } from 'react';
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
  // TODO: ref does not match typing, need to investigate
  const svgRef = useRef<{ base: SVGSVGElement }>(null);
  const runningAnimationsCountRef = useRef(0);
  const isFirstEntryRef = useRef(true);

  const [isPaused, setIsPaused] = useState(autoplay !== 'enabled');
  const [isFinished, setIsFinished] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    let observer: IntersectionObserver;
    if (autoplay === 'on-viewport-entry') {
      const threshold = 1;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.intersectionRatio >= threshold &&
              isFirstEntryRef.current
            ) {
              togglePlayState();
              isFirstEntryRef.current = false;
            }
          });
        },
        { threshold },
      );

      observer.observe(svgRef.current.base);
    }

    const elements = svgRef.current.base?.querySelectorAll<SVGGElement>('g g');
    runningAnimationsCountRef.current = elements?.length ?? 0;

    const onAnimationEnd = () => {
      runningAnimationsCountRef.current = runningAnimationsCountRef.current - 1;

      if (runningAnimationsCountRef.current === 0) {
        setIsFinished(true);
      }
    };

    elements?.forEach((element) => {
      element.addEventListener('animationend', onAnimationEnd);
    });

    return () => {
      elements?.forEach((element) => {
        element.removeEventListener('animationend', onAnimationEnd);
      });

      observer?.disconnect();
    };
  }, [isRestarting]);

  const changeAnimationPlayState = (state: 'running' | 'paused') => {
    svgRef.current?.base
      ?.querySelectorAll<SVGGElement>('g g')
      .forEach((element) => (element.style.animationPlayState = state));
  };
  const togglePlayState = () => {
    setIsPaused((prevIsPaused) => {
      changeAnimationPlayState(prevIsPaused ? 'running' : 'paused');
      return !prevIsPaused;
    });
  };
  useEffect(() => {
    if (autoplay === 'enabled') {
      changeAnimationPlayState('running');
    }
  }, []);

  const restart = () => {
    // super duper ugly hacks to restart svg animation!
    setIsFinished(false);
    setIsRestarting(true);
    window.requestAnimationFrame(() => {
      setIsRestarting(false);
      window.requestAnimationFrame(() => changeAnimationPlayState('running'));
    });
  };

  const componentContents = (
    <Container className={className} id={slideId}>
      <div>
        <ImageWrapper
          href={`#${slideId}`}
          useImageBorder={useImageBorder}
          isSectionHeader={isSectionHeader}
        >
          <Svg
            style={{
              height: 'auto',
              display: 'block',
            }}
            viewBox="0 0 1280 720"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={svgRef}
          />
        </ImageWrapper>
        {hasControls && !isFinished && (
          <PlayControlButton onClick={togglePlayState}>
            {isPaused ? 'Play' : 'Pause'}
          </PlayControlButton>
        )}
        {hasControls && isFinished && (
          <PlayControlButton onClick={restart}>Replay</PlayControlButton>
        )}
      </div>
      <Text isSectionHeader={isSectionHeader}>{children}</Text>
    </Container>
  );

  // why? to replace svg node with finished animations with newly created one, which would allow to restart animation.
  // this turned out to be the only way to properly do it.
  if (isRestarting) {
    return <div>{componentContents}</div>;
  }

  return componentContents;
};

export default AnimatedSlide;
