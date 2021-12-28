import styled, { createGlobalStyle } from 'styled-components';
import _ActionButton from '../components/ActionButton';
import _ContactSection from '../components/HomeSectionContact';
import _Link from '../components/Link';
import _Nav from '../components/Nav';
import media from '../styles/media';
import { linkActiveStyles } from '../styles/shared-styles';
import { colors, sizes, gridSize } from '../styles/variables';

const listAndBlockquoteInnerSpacing = 24;
export const IndexPageGlobalStyles = createGlobalStyle`
  body {
    --homepage-font-size-regular: ${sizes.fontLarge}px;
    --homepage-font-size-small: ${sizes.fontDefault}px;

    font-size: var(--homepage-font-size-regular);

    ${media.small`
      --homepage-font-size-regular: ${sizes.fontDefault}px;
      --homepage-font-size-small: ${sizes.fontSmall}px;
    `}
  }

  :is(ul, blockquote, p) + :is(ul, blockquote, p) {
    margin-top: ${sizes.paragraphSpacing}px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: ${listAndBlockquoteInnerSpacing}px;
  }

  li::before {
    content: '—';
    position: absolute;
    transform: translateX(-${listAndBlockquoteInnerSpacing}px);
  }

  blockquote {
    margin: 0;
    padding: ${gridSize * 1.5}px 0 ${gridSize * 2}px
      ${listAndBlockquoteInnerSpacing - 4}px;
    border-left: 4px solid #eee;
  }

  blockquote footer {
    margin-top: ${gridSize}px;
    font-size: var(--homepage-font-size-small);
    color: #777;

    &::before {
      content: '— ';
    }
  }
`;

const Background = styled.div`
  // Make the component wrap margins of nested elements
  overflow: hidden;
`;

export const HeaderBackground = styled(Background)`
  margin-bottom: 60px;
  background: black;
`;

export const ActionButton = styled(_ActionButton)`
  margin-bottom: 60px;
`;

export const NewArticleBackground = styled.div`
  background: ${colors.brightYellow};
  padding: ${gridSize}px 0;
`;

export const NewArticleLink = styled(_Link)`
  color: black;
  border-bottom-color: rgba(0, 0, 0, 0.25);

  &:hover,
  &:focus,
  &:active {
    ${linkActiveStyles}
  }
`;

export const ServicesBackground = styled(Background)`
  padding: 60px 0 96px;
  background: ${colors.softYellow};
`;

export const FooterWrapper = styled(Background)`
  padding: 0 0 24px;
`;

export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  font-size: 16px;
`;

export const Header = styled.header`
  margin: 120px 0 60px;
  color: #ffdb01;
  max-width: 800px;

  ${media.small`
    margin-top: 100px;
    margin-bottom: 40px;
  `};
`;

export const H1 = styled.h1`
  margin: 0;
  font-size: 60px;
  line-height: 1.2;
  font-weight: 900;

  ${media.small`
    font-size: 36px;
  `};
`;

interface SectionWrapperExtraProps {
  marginBottom?: number;
}

export const SectionWrapper = styled.div`
  margin-bottom: ${(props: SectionWrapperExtraProps) =>
    props.marginBottom === undefined ? 80 : props.marginBottom}px;
`;

export const ContactSection = styled(_ContactSection)`
  margin: 120px 0;

  ${media.small`
    margin: 60px 0;
  `};
`;
