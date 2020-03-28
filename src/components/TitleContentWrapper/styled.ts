import styled, { css } from 'styled-components';
import media from '../../styles/media';

export const Title = styled.div``;

export const Content = styled.div``;

interface WrapperExtraProps {
  alwaysVertical: boolean;
}

// prettier-ignore
export const Wrapper = styled.section`
  ${(props: WrapperExtraProps) => !props.alwaysVertical && css`
    ${media.notSmall`
      display: flex;

      ${Title} {
        flex: 4;
        margin: 0 60px 24px 0;
      }

      ${Content} {
        flex: 7;
      }
    `}
  `}
`;
