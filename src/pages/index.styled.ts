import styled from 'styled-components';
import _Footer from '../components/Footer';
import Image from '../components/Image';
import Link from '../components/Link';
import _MailchimpSubscribe from '../components/MailchimpSubscribe';
import _Nav from '../components/Nav';
import media from '../styles/media';
import { linkActiveStyles, linkStyles } from '../styles/shared-styles';
import { colors, gridSize, sizes } from '../styles/variables';
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

export const SectionHeader = styled.h2`
  margin: ${gridSize * 8}px 0 ${gridSize * 4}px;
  font-size: 48px;
  font-weight: bold;
  line-height: 1;

  ${media.small`
    font-size: 36px;
  `}
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

export const ItemImage = styled.div``;

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
