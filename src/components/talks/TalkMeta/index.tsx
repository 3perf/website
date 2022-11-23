import * as React from 'react';
import { Container, Date, AuthorLink } from './styled';

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
    )}{' '}
    {'·'} {authors.length === 1 ? 'Author: ' : 'Authors: '}
    {authors.map((author, index) => (
      <AuthorLink href={author.link} rel="author" key={`${index}`}>
        {author.name}
        {index !== authors.length - 1 ? ',' : ''}
      </AuthorLink>
    ))}
  </Container>
);

export default TalkMeta;
