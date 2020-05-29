import styled from 'styled-components';
import media from '../../../styles/media';

const SectionHeader = styled.div`
  font-size: 60px;
  font-weight: bold;
  white-space: nowrap;
  letter-spacing: -1px;

  ${media.small`
    font-size: 48px;
    white-space: normal;
    line-height: 1;
  `};
`;

export default SectionHeader;
