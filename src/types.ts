import type { ImageFixed, ImageFluid } from '../src/components/Image';

export type JSXChildrenProp =
  | string
  | string[]
  | JSX.Element
  | JSX.Element[]
  | Array<string | JSX.Element>;

export interface GraphqlImageFluid {
  childImageSharp: {
    fluid: ImageFluid;
  };
}

export interface GraphqlImageFixed {
  childImageSharp: {
    fixed: ImageFixed;
  };
}
