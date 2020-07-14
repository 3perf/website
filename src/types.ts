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

export enum ConsultingDuration {
  M30 = '30',
  M60 = '60',
  M90 = '90',
}
