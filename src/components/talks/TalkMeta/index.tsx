import { IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';
import { Container, Date, AuthorImage, AuthorLink, AuthorName } from './styled';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

interface TalkMetaProps {
  author?: {
    imageData: IGatsbyImageData;
    name: string;
    link: string;
  };
  lastUpdatedDate?: Date;
  className?: string;
}

const TalkMeta = ({ author, className, lastUpdatedDate }: TalkMetaProps) => {
  const lastUpdatedJsx = lastUpdatedDate && (
    <Date>
      Last updated:{' '}
      <time dateTime={lastUpdatedDate.toISOString()}>
        {formatDate(lastUpdatedDate)}
      </time>
    </Date>
  );

  const authorJsx = author && (
    <>
      Author:{' '}
      <AuthorLink href={author.link} rel="author">
        <AuthorImage imageData={author.imageData} />
        <AuthorName>{author.name}</AuthorName>
      </AuthorLink>
    </>
  );

  return (
    <Container className={className}>
      {lastUpdatedJsx}
      {lastUpdatedJsx && authorJsx ? ' · ' : null}
      {authorJsx}
    </Container>
  );
};

export default TalkMeta;
