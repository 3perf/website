import { IGatsbyImageData } from 'gatsby-plugin-image';

export type JSXChildrenProp =
  | string
  | string[]
  | JSX.Element
  | JSX.Element[]
  | Array<string | JSX.Element>;

export interface GraphqlImage {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}
