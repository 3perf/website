import * as React from 'react';
import { Caption, CaptionHeader, Figure, Link, Video } from './styled';

interface LiveDemoProps {
  slideId: string;
  title: string;
  videoSource: string;
  videoType: 'video/mp4'; // Add new types if necessary
  videoWidth: number;
  videoHeight: number;
  subtitlesSource?: string;
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
  subtitlesSource,
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
      {subtitlesSource && (
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src={subtitlesSource}
          default
        />
      )}
    </Video>
  </Figure>
);

export default LiveDemo;
