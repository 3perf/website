import { IGatsbyImageData } from 'gatsby-plugin-image';
import { Fragment } from 'react';
import { JSXChildrenProp } from '../../../types';
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
  presentedAt?: JSXChildrenProp;
  lastUpdatedDate?: Date;
  className?: string;
}

const TalkMeta = ({
  author,
  className,
  lastUpdatedDate,
  presentedAt,
}: TalkMetaProps) => {
  const items: JSXChildrenProp[] = [];

  if (lastUpdatedDate) {
    items.push(
      <Date key="last-updated-date">
        Last updated:{' '}
        <time dateTime={lastUpdatedDate.toISOString()}>
          {formatDate(lastUpdatedDate)}
        </time>
      </Date>,
    );
  }

  if (author) {
    items.push(
      <Fragment key="author">
        Author:{' '}
        <AuthorLink href={author.link} rel="author">
          <AuthorImage imageData={author.imageData} />
          <AuthorName>{author.name}</AuthorName>
        </AuthorLink>
      </Fragment>,
    );
  }

  if (presentedAt) {
    items.push(
      <Fragment key="presented-at">Presented at {presentedAt}</Fragment>,
    );
  }

  const itemsWithSeparators = items.reduce((acc, item, index) => {
    if (index > 0) {
      acc.push(' · ');
    }
    acc.push(item);
    return acc;
  }, [] as JSXChildrenProp[]);

  return <Container className={className}>{itemsWithSeparators}</Container>;
};

export default TalkMeta;
