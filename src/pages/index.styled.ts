import styled from 'styled-components';
import _Footer from '../components/Footer';
import Image from '../components/Image';
import Link from '../components/Link';
import _MailchimpSubscribe from '../components/MailchimpSubscribe';
import _Nav from '../components/Nav';
import media from '../styles/media';
import { linkActiveStyles, linkStyles } from '../styles/shared-styles';
import { animations, colors, gridSize, sizes } from '../styles/variables';
import backgroundUrl from './background.svg';

export const Background = styled.div`
  background: #151515;
  color: white;
  min-height: 100vh;
  overflow: hidden;
  font-size: ${sizes.fontLarge}px;

  --link-color: white;
  --link-border-color: rgba(255, 255, 255, 0.25);
`;

export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 4}px;
  font-size: 16px;
`;

export const Header = styled.h1`
  margin: ${gridSize * 8}px 0 ${gridSize * 4}px;
  font-size: 60px;
  line-height: 1.2;
  color: ${colors.brightYellow};
  font-weight: 900;

  background: url('${backgroundUrl}') center bottom;
  background-size: cover;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  ${media.small`
    font-size: 36px;
    margin-bottom: ${gridSize * 2}px;
  `}
`;

export const Section = styled.div`
  columns: 2 300px;
  column-gap: ${gridSize * 6}px;
`;

export const SectionDateView = styled.div`
  margin-top: ${gridSize * 8}px;
`;

export const DateYearHeader = styled.h3`
  margin: ${gridSize * 6}px 0 ${gridSize * 3}px;
  font-size: 36px;
  font-weight: bold;
  line-height: 1;
  color: ${colors.brightYellow};

  &:first-of-type {
    margin-top: 0;
  }

  ${media.small`
    font-size: 28px;
  `}
`;

export const SectionHeader = styled.h2`
  margin: ${gridSize * 8}px 0 ${gridSize * 4}px;
  font-size: 48px;
  font-weight: bold;
  line-height: 1;

  ${media.small`
    font-size: 36px;
  `}
`;

export const SortPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${gridSize}px;
  margin: ${gridSize * 8}px 0 0;
`;

export const SortPill = styled.label`
  position: relative;
  isolation: isolate;
  display: inline-grid;
  place-items: center;
  margin: 0;
  min-height: 31px;
  padding: 6px ${gridSize * 2}px;
  font: inherit;
  font-size: ${sizes.fontDefault}px;
  line-height: 1.2;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  color: inherit;
  transition: color ${animations.hover.duration} ${animations.hover.easing};

  > span {
    position: relative;
    z-index: 1;
  }

  > svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  > svg [data-pill-fill],
  > svg [data-pill-stroke] {
    transition: fill ${animations.hover.duration} ${animations.hover.easing},
      stroke ${animations.hover.duration} ${animations.hover.easing};
  }

  > svg [data-pill-fill] {
    fill: transparent;
  }

  > svg [data-pill-stroke] {
    fill: none;
    stroke: rgba(255, 255, 255, 0.35);
  }

  &:hover > svg [data-pill-fill],
  &:focus-within > svg [data-pill-fill] {
    fill: rgba(255, 219, 1, 0.12);
    transition: none;
  }

  &:hover > svg [data-pill-stroke],
  &:focus-within > svg [data-pill-stroke] {
    stroke: ${colors.brightYellow};
    transition: none;
  }
`;

export const SortInput = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;

export const SortLegend = styled.legend`
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;

export const SortSwitcher = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;

  > [data-sort-view='date'] {
    display: none;
  }

  #sort-content:checked ~ ${SortPills} label[for='sort-content'],
  #sort-date:checked ~ ${SortPills} label[for='sort-date'] {
    color: #151515;
  }

  #sort-content:checked
    ~ ${SortPills}
    label[for='sort-content']
    > svg
    [data-pill-fill],
  #sort-date:checked
    ~ ${SortPills}
    label[for='sort-date']
    > svg
    [data-pill-fill] {
    fill: ${colors.brightYellow};
  }

  #sort-content:checked
    ~ ${SortPills}
    label[for='sort-content']
    > svg
    [data-pill-stroke],
  #sort-date:checked
    ~ ${SortPills}
    label[for='sort-date']
    > svg
    [data-pill-stroke] {
    stroke: ${colors.brightYellow};
  }

  #sort-content:focus-visible ~ ${SortPills} label[for='sort-content'],
  #sort-date:focus-visible ~ ${SortPills} label[for='sort-date'] {
    outline: 2px solid ${colors.brightYellow};
    outline-offset: 2px;
  }

  #sort-date:checked ~ [data-sort-view='content'] {
    display: none;
  }

  #sort-date:checked ~ [data-sort-view='date'] {
    display: block;
  }
`;

export const ItemSectionLabel = styled.div`
  font-size: ${sizes.fontSmall}px;
  opacity: 0.65;
  margin-bottom: ${gridSize * 0.25}px;
`;

export const ItemLink = styled(Link)`
  display: block;
  border: none;
  margin-bottom: ${gridSize * 4}px;
  page-break-inside: avoid;
  break-inside: avoid;
`;

export const ItemTitle = styled.div`
  display: inline;
  font-weight: bold;

  ${linkStyles}

  ${ItemLink}:hover &,
  ${ItemLink}:focus &,
  ${ItemLink}:active & {
    ${linkActiveStyles}
  }
`;

export const ItemImage = styled.div<{ $belowTitle?: boolean }>`
  ${(p) =>
    p.$belowTitle &&
    `
    margin-top: ${gridSize * 1.5}px;
  `}
`;

export const ItemDescription = styled.div`
  margin-top: ${gridSize * 0.5}px;
  font-size: ${sizes.fontDefault}px;
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 6}px;
  margin-bottom: ${gridSize * 2}px;
`;

export const BadgeImage = styled.img`
  display: block;
  margin-top: ${gridSize}px;
`;

export const Badge = styled.span`
  border-radius: 999px;
  padding: 2px 8px;

  border: 1px solid currentColor;
  background-size: 100px;

  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  vertical-align: middle;
`;

export const MailchimpSubscribe = styled(_MailchimpSubscribe)`
  margin: ${gridSize * 6}px -${gridSize * 3}px;
  max-width: 600px;
  padding: ${gridSize * 2}px ${gridSize * 3}px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
`;

export const AvatarImage = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: -4px;
`;

export const NameLink = styled.a`
  white-space: nowrap;

  border-bottom: none;
`;

export const Name = styled.span`
  ${linkStyles}

  ${NameLink}:hover &,
  ${NameLink}:focus &,
  ${NameLink}:active & {
    ${linkActiveStyles}
  }
`;
