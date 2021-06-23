import * as React from 'react';
import { Container, Date, Link, Name } from './styled';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

interface TalkMetaProps {
  authors: Array<{
    imageData: any;
    name: string;
    description: string;
    link: string;
  }>;
  lastUpdatedDate?: Date;
  className?: string;
}

const TalkMeta = ({ authors, className, lastUpdatedDate }: TalkMetaProps) => (
  <Container className={className}>
    {lastUpdatedDate && (
      <Date>
        Last updated on{' '}
        <time dateTime={lastUpdatedDate.toISOString()}>
          {formatDate(lastUpdatedDate)}
        </time>
      </Date>
    )}
    <span>{'·'}</span>
    <span>{authors.length === 1 ? 'Author' : 'Authors'}:</span>
    {authors.map((author, index) => (
      <Link href={author.link} key={`${index}`}>
        <Name>
          {author.name}
          {index !== authors.length - 1 ? ',' : ''}
        </Name>
      </Link>
    ))}
  </Container>
);

export default TalkMeta;
