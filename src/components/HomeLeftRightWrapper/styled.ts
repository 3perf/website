import styled, { css } from 'styled-components';
import media from '../../styles/media';

export const Left = styled.div``;

export const Right = styled.div``;

export const Wrapper = styled.section<{
  $alwaysVertical: boolean;
}>`
  ${(props) =>
    !props.$alwaysVertical &&
    css`
      ${media.notSmall`
      display: flex;

      ${Left} {
        flex: 4;
        margin: 0 60px 24px 0;
      }

      ${Right} {
        flex: 7;
      }
    `}
    `}
`;
