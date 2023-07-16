import styled from 'styled-components';
import { gridSize } from '../../styles/variables';
import paymentLogos from './payment-logos.svg';

export const Container = styled.div``;

export const Credentials = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Legal = styled.div`
  max-width: 550px;
  margin-top: ${gridSize}px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const LicenseName = styled.span<{
  $useFontSpacing: boolean;
}>`
  letter-spacing: ${(props) => (props.$useFontSpacing ? 1 : 0)}px;
`;

export const PaymentDetails = styled.img.attrs({
  src: paymentLogos,
})`
  display: block;
  margin-top: ${gridSize}px;
  max-height: 50px;
  max-width: 100%;
`;
