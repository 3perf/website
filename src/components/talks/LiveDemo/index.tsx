import * as React from 'react';
import { Caption, CaptionHeader, Figure, Link, Video } from './styled';

interface LiveDemoProps {
  slideId: string;
  title: string;
  videoSource: string;
  videoType: 'video/mp4'; // Add new types if necessary
  videoWidth: number;
  videoHeight: number;
  className?: string;
}

const LiveDemo = ({
  slideId,
  title,
  className,
  videoSource,
  videoType,
  videoWidth,
  videoHeight,
}: LiveDemoProps) => (
  <Figure className={className} id={slideId}>
    <Caption>
      <Link href={`#${slideId}`}>
        <CaptionHeader>Live Demo:</CaptionHeader> {title}
      </Link>
    </Caption>
    <Video
      controls
      style={{
        aspectRatio: `${videoWidth} / ${videoHeight}`,
        maxWidth: videoWidth,
      }}
    >
      <source src={videoSource} type={videoType} />
    </Video>
  </Figure>
);

export default LiveDemo;
