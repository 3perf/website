import styled from 'styled-components';
import _ChatButton from '../components/ChatButton';
import _ContactSection from '../components/HomeSectionContact';
import _Nav from '../components/Nav';
import media from '../styles/media';
import { colors, sizes } from '../styles/variables';

const Background = styled.div`
  // Make the component wrap margins of nested elements
  overflow: hidden;
`;

export const Content = styled.div`
  font-size: ${sizes.fontLarge}px;

  ${media.small`
    font-size: ${sizes.fontDefault}px;
  `};
`;

export const HeaderBackground = styled(Background)`
  margin-bottom: 60px;
  background: black;
`;

export const ChatButton = styled(_ChatButton)`
  margin-bottom: 60px;
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

export const ColumnsWrapper = styled.div`
  display: flex;

  ${media.small`
    display: block;
  `};
`;

interface SectionWrapperExtraProps {
  marginBottom?: number;
}

export const SectionWrapper = styled.div`
  margin-bottom: ${(props: SectionWrapperExtraProps) =>
    props.marginBottom === undefined ? 80 : props.marginBottom}px;
`;

export const ColumnSectionWrapper = styled(SectionWrapper)`
  flex: 1;
`;

export const ContactSection = styled(_ContactSection)`
  margin: 120px 0;

  ${media.small`
    margin: 60px 0;
  `};
`;
