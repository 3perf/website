import * as React from 'react';
import { Content, Description, Image, Link, Name } from './styled';

interface AuthorProps {
  imageData: any;
  name: string;
  description: string;
  link: string;
}

const Author = ({ imageData, name, description, link }: AuthorProps) => (
  <Link href={link}>
    <Image fixed={imageData} />
    <Content>
      <Name>{name}</Name>
      <Description>{description}</Description>
    </Content>
  </Link>
);

export default Author;
