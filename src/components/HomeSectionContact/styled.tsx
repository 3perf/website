import React from 'react';
import styled, { keyframes } from 'styled-components';
import media from '../../styles/media';
import { linkStyles, linkActiveStyles } from '../../styles/shared-styles';
import { gridSize } from '../../styles/variables';
import Image, { ImageProps } from '../Image';

export const Container = styled.div`
  margin: 0 -60px;
  max-width: 900px;
  padding: 30px 100px 40px 60px;
  border-radius: 4px;
  background: #ffdb01;
  color: #000;

  --link-color: black;
  --link-border-color: rgba(0, 0, 0, 0.5);
`;

export const Link = styled.a`
  font-size: 84px;
  font-weight: bold;
  white-space: nowrap;
  border-bottom: none;
  text-decoration: underline;

  ${media.small`
    font-size: calc(10vw);
  `};
`;

export const PromptContainer = styled.div`
  margin-top: ${gridSize * 3}px;
`;

export const Contact = styled.span`
  white-space: nowrap;
`;

export const ContactImage = (props: ImageProps) => (
  <Image
    {...props}
    style={{ display: 'inline-block', verticalAlign: -5 }}
    imgStyle={{ borderRadius: '50%' }}
  />
);
