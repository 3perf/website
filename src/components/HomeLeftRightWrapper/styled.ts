import styled, { css } from 'styled-components';
import media from '../../styles/media';

export const Left = styled.div``;

export const Right = styled.div``;

interface WrapperExtraProps {
  alwaysVertical: boolean;
}

export const Wrapper = styled.section`
  ${(props: WrapperExtraProps) =>
    !props.alwaysVertical &&
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
