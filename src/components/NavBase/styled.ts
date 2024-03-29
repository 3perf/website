import styled, { css } from 'styled-components';
import media from '../../styles/media';
import Link from '../Link';
import _Logo from '../Logo';

const containerChildrenSpacingHorizontal = 24;
export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px ${containerChildrenSpacingHorizontal}px;
`;

export const Logo = styled(_Logo)`
  display: block;
  height: 50px;
  width: 50px;
`;

export const ItemsWrapper = styled.div<{
  $navKind: NavKind;
}>`
  flex: 1 0 auto;
  max-width: calc(100% - ${containerChildrenSpacingHorizontal}px);

  ${(props) =>
    props.$navKind === NavKind.Light &&
    css`
      color: white;
      --link-color: white;
      --link-border-color: rgba(255, 255, 255, 0.25);
    `};
`;

export const Items = styled.div`
  display: flex;
  gap: 3px 12px;
  flex-wrap: wrap;
`;

export enum NavKind {
  Dark,
  Light,
}

export const BlockLink = styled(Link)`
  display: block;
  border: none;
`;

export const SecondaryItems = styled.div`
  ${media.notSmall`
      margin-left: auto;
  `};
`;
