import * as React from 'react';
import { Container, Caption, CaptionHeader, Video } from './styled';

interface LiveDemoProps {
  slideId: string;
  title: string;
  videoSource: string;
  videoType: 'video/mp4'; // Add new types if necessary
  videoWidth: number;
  videoHeight: number;
  className?: string;
}

// TODO: #-link to the demo
const LiveDemo = ({
  slideId,
  title,
  className,
  videoSource,
  videoType,
  videoWidth,
  videoHeight,
}: LiveDemoProps) => (
  <Container className={className} id={slideId}>
    <Caption>
      <CaptionHeader>Live Demo:</CaptionHeader> {title}
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
  </Container>
);

export default LiveDemo;
