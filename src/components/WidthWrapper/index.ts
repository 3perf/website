import styled from 'styled-components';
import { sizes } from '../../styles/variables';

const WidthWrapper = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  padding: 0 ${sizes.contentPadding}px;

  @media print {
    max-width: none;
  }
`;

export default WidthWrapper;
