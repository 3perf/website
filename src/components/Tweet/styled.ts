import styled from 'styled-components';

export const Fallback = styled.div`
  /* Detect a case when the tweet card is loaded and hide the fallback.
     This is really hacky, but this is better than having a listener
     for <OriginalTweetWidget onLoad /> and setting a state in it.
     In the latter case, a double render happens, and both widgets appear
     on the screen for a short time. */
  div:not(:empty) + & {
    display: none;
  }
`;
