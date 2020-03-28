import styled, { css } from 'styled-components';
import media from '../../styles/media';
import Link from '../Link';
import _Logo from '../Logo';

const containerChildrenSpacingHorizontal = 24;
export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin: -6px -${containerChildrenSpacingHorizontal / 2}px;

  > * {
    margin: 6px ${containerChildrenSpacingHorizontal / 2}px;
  }
`;

export const Logo = styled(_Logo)`
  display: block;
  height: 50px;
  width: 50px;
`;

export const ItemsWrapper = styled.div`
  flex: 1 0 auto;
  max-width: calc(100% - ${containerChildrenSpacingHorizontal}px);
`;

export const Items = styled.div`
  display: flex;
  margin: -3px -12px;
  flex-wrap: wrap;

  > * {
    margin: 3px 12px;
  }
`;

export enum NavKind {
  Dark,
  Light,
}

interface ItemExtraProps {
  navKind: NavKind;
}

const Item = styled(Link)`
  ${(props: ItemExtraProps) =>
    props.navKind === NavKind.Light &&
    css`
      color: white;
      border-bottom-color: rgba(255, 255, 255, 0.25);
    `};
`;

export const PrimaryItem = styled(Item)``;

export const SecondaryItem = styled(Item)`
  ${media.notSmall`
    ${PrimaryItem} + & {
      margin-left: auto;
    }
  `};
`;

export const BlockLink = styled(Link)`
  display: block;
  border: none;
`;
