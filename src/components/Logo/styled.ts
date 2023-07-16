import styled from 'styled-components';
import _LogoSvg from './logo.component.svg';

export const LogoSvg = styled(_LogoSvg)<{
  $color: string;
}>`
  #perf-letters path {
    fill: ${(props) => props.$color};
  }

  rect {
    stroke: ${(props) => props.$color};
  }
`;
