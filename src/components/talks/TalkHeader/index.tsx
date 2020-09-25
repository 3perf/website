import * as React from 'react';
import { JSXChildrenProp } from '../../../types';
import Author from '../../Author';
import { ImageFluid } from '../../Image';
import {
  Authors,
  AuthorWrapper,
  Container,
  Date,
  Description,
  Image,
  Meta,
  MetaChild,
  Title,
} from './styled';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

interface TalkHeaderProps {
  imageData: ImageFluid;
  title: JSXChildrenProp;
  description: JSXChildrenProp;
  authors: Array<{
    imageData: any;
    name: string;
    description: string;
    link: string;
  }>;
  publishedDate: Date;
  lastUpdatedDate?: Date;
  className?: string;
}

const TalkHeader = ({
  imageData,
  title,
  description,
  authors,
  className,
  publishedDate,
  lastUpdatedDate,
}: TalkHeaderProps) => (
  <Container className={className}>
    <Image loading="eager" imageData={imageData} />
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Meta>
      <MetaChild>
        <Authors>
          {authors.map((author, i) => (
            <AuthorWrapper key={i}>
              <Author
                imageData={author.imageData}
                name={author.name}
                description={author.description}
                link={author.link}
              />
            </AuthorWrapper>
          ))}
        </Authors>
      </MetaChild>
      <MetaChild>
        <Date>
          Published on{' '}
          <time dateTime={publishedDate.toISOString()}>
            {formatDate(publishedDate)}
          </time>
        </Date>
        {lastUpdatedDate && (
          <Date>
            Last updated on{' '}
            <time dateTime={lastUpdatedDate.toISOString()}>
              {formatDate(lastUpdatedDate)}
            </time>
          </Date>
        )}
      </MetaChild>
    </Meta>
  </Container>
);

export default TalkHeader;
