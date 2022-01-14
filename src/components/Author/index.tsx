import { IGatsbyImageData } from 'gatsby-plugin-image';
import * as React from 'react';
import { Content, Description, Image, Link, Name } from './styled';

interface AuthorProps {
  imageData: IGatsbyImageData;
  name: string;
  description: string;
  link: string;
}

const Author = ({ imageData, name, description, link }: AuthorProps) => (
  <Link href={link}>
    <Image imageData={imageData} />
    <Content>
      <Name>{name}</Name>
      <Description>{description}</Description>
    </Content>
  </Link>
);

export default Author;
