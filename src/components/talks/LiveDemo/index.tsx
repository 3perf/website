import { Caption, CaptionHeader, Figure, Link, Video } from './styled';

interface LiveDemoProps {
  slideId: string;
  title: string;
  videoSource: string;
  videoWidth: number;
  videoHeight: number;
  className?: string;
}

const LiveDemo = ({
  slideId,
  title,
  className,
  videoSource,
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
      style={{
        aspectRatio: `${videoWidth} / ${videoHeight}`,
        maxWidth: videoWidth,
      }}
    >
      <iframe
        width="100%"
        src={`${videoSource}?rel=0&modestbranding=1&cc_load_policy=1`}
        title={title}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </Video>
  </Figure>
);

export default LiveDemo;
