import { FluidObject, FixedObject } from 'gatsby-image';

export type JSXChildrenProp =
  | string
  | string[]
  | JSX.Element
  | JSX.Element[]
  | Array<string | JSX.Element>;

export interface SharpImageFluid {
  childImageSharp: {
    fluid: FluidObject;
  };
}

export interface SharpImageFixed {
  childImageSharp: {
    fixed: FixedObject;
  };
}

declare global {
  interface Window {
    Chatra: (methodName: 'openChat', focus?: boolean) => void;
  }
}
