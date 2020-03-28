import { lighten } from 'polished';
import styled from 'styled-components';
import _Footer from '../components/Footer';
import _Nav from '../components/Nav';
import backgroundLowresUrl from '../pages/subscribe/background-lowres.jpg';
import backgroundUrl from '../pages/subscribe/background.jpg';
import media from '../styles/media';
import { linkActiveStyles } from '../styles/shared-styles';
import { colors, gridSize, sizes } from '../styles/variables';

export const Background = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${backgroundUrl}), url(${backgroundLowresUrl});
  background-color: #111;
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;

  color: white;

  a {
    color: white;
    border-bottom-color: rgba(255, 255, 255, 0.25);

    &:hover,
    &:focus,
    &:active {
      ${linkActiveStyles};
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  font-size: ${sizes.fontLarge}px;

  ${media.small`
    font-size: ${sizes.fontDefault}px;
  `}
`;

export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 4}px;
  font-size: 16px;
`;

export const Header = styled.h1`
  margin: 0 0 ${gridSize * 3}px;
  font-size: 3em;
  line-height: 1;
`;

export const SubscribeBlock = styled.div`
  margin-top: ${gridSize * 5}px;
  max-width: 600px;
  padding: ${gridSize * 2}px ${gridSize * 3}px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
`;

export const MailchimpContainer = styled.div`
  margin-top: ${sizes.paragraphSpacing}px;
`;

export const MailchimpInput = styled.input`
  margin-right: ${gridSize * 2}px;
  margin-bottom: ${gridSize}px;
  height: 32px;
  border: none;
  border-radius: 2px;
  padding: 0 12px;

  font-size: inherit;
  font-family: inherit;
`;

export const MailchimpSubmit = styled.input`
  height: 32px;
  padding: 0 12px;
  border-radius: 2px;

  font-size: inherit;
  font-family: inherit;

  background: ${colors.brightYellow};
  color: black;
  border: none;

  &:hover,
  &:focus,
  &:active {
    background: ${lighten(0.2, colors.brightYellow)};
  }
`;

export const HiddenDiv = styled.div.attrs({
  'aria-hidden': true,
})`
  position: absolute;
  left: -5000px;
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 8}px;
  margin-bottom: ${gridSize * 2}px;
  font-size: 0.75em;
`;
