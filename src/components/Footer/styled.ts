import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface LicenseNameProps {
  useFontSpacing: boolean;
}
export const LicenseName = styled.span`
  letter-spacing: ${(props: LicenseNameProps) =>
    props.useFontSpacing ? 1 : 0}px;
`;
