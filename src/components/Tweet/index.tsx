import * as React from 'react';
import { Tweet as OriginalTweetWidget } from 'react-twitter-widgets';
import { JSXChildrenProp } from '../../types';
import { Fallback } from './styled';

interface TweetProps {
  tweetId: string;
  fallback: JSXChildrenProp;
}

const Tweet = ({ fallback, tweetId }: TweetProps) => {
  return (
    <>
      <OriginalTweetWidget tweetId={tweetId} />
      <Fallback>{fallback}</Fallback>
    </>
  );
};

export default Tweet;
