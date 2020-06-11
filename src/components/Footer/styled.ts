import styled from 'styled-components';
import { sizes, gridSize } from '../../styles/variables';

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

interface LicenseNameProps {
  useFontSpacing: boolean;
}
export const LicenseName = styled.span`
  letter-spacing: ${(props: LicenseNameProps) =>
    props.useFontSpacing ? 1 : 0}px;
`;
