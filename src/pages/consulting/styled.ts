import styled from 'styled-components';
import _Footer from '../../components/Footer';
import _Nav from '../../components/Nav';
import media from '../../styles/media';
import { gridSize, sizes, colors } from '../../styles/variables';

export const Main = styled.main``;

export const Header = styled.h1`
  position: relative;
  color: white;
  font-weight: 900;
  line-height: 1.2;
  margin: 0 0 ${gridSize * 5}px;

  &::before {
    content: '';
    display: block;
    z-index: -1;
    position: absolute;
    top: -15px;
    bottom: -15px;
    left: -15px;
    right: -10px;
    /* background: ${colors.brightYellow}; */
    background: black;
    /* border: 5px solid ${colors.brightYellow}; */
    transform: rotate(-1.5deg);
  }

  ${media.notSmall`
    margin: ${gridSize * 10}px 0 ${gridSize * 10}px;
    font-size: 48px;

    &::before {
      top: -30px;
      bottom: -30px;
      left: -30px;
      right: -30px;
    }
  `}
`;

export const Mark = styled.mark`
  background: ${colors.brightYellow};
`;

export const Intro = styled.div`
  ${media.notSmall`
    font-size: 24px;
    max-width: 600px;
  `}
`;

export const Form = styled.form`
  background: ${colors.softYellow};
  margin: ${gridSize * 2}px -${gridSize * 3}px;
  padding: ${gridSize * 4}px ${gridSize * 3}px ${gridSize * 5}px;

  ${media.notSmall`
    margin: ${gridSize * 5}px -${gridSize * 5}px;
    padding-left: ${gridSize * 5}px;
    padding-right: ${gridSize * 5}px;
  `}
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;

  & + & {
    margin-top: ${gridSize * 3}px;
  }
`;

export const FormRowTitle = styled.p`
  flex: none;
  width: 200px;
  margin-bottom: ${gridSize}px;
`;

export const FormRowContent = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 500px;
`;

export const FormHeader = styled.h2`
  margin: 0 0 ${gridSize * 3}px;
  font-weight: normal;
  font-size: 30px;
  line-height: 1.3;

  ${media.notSmall`
    font-weight: bold;
  `}
`;

export const RadioSelect = styled.div`
  display: flex;

  input {
    position: absolute;
    z-index: -1;
  }

  label {
    position: relative;
    display: inline-block;
    padding: ${gridSize / 4}px ${gridSize}px;
    background: white;
    border: 1px solid ${colors.brightYellow};
    cursor: pointer;
  }

  > div:first-child > label {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  > div:last-child > label {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  > div + div > label {
    margin-left: -1px;
  }

  input:checked + label {
    background: ${colors.brightYellow};
  }

  input:focus + label {
    border-color: black;
    z-index: 1;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  flex: none;
  margin-right: ${gridSize}px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  border: 1px solid #aaa;
  border-radius: 0;
  padding: ${gridSize / 2}px ${gridSize}px;

  font: inherit;

  &:focus,
  &:active {
    border-color: black;
  }
`;

export const FormNote = styled.p`
  font-size: ${sizes.fontSmall}px;
  margin: ${gridSize}px 0 0;
`;

export const PaymentSection = styled.div``;

export const Nav = styled(_Nav)`
  margin-top: ${sizes.navTopMargin}px;
  margin-bottom: ${gridSize * 6}px;
  font-size: 16px;
`;

export const Blockquote = styled.blockquote`
  padding: 0;
  margin: 0;
`;

export const BlockquoteFooter = styled.footer`
  margin-top: ${sizes.paragraphSpacing}px;
  font-size: ${sizes.fontSmall}px;
`;

export const Questions = styled.div``;

export const QuestionsHeader = styled.h2`
  margin: 0 0 ${gridSize * 3}px;
  font-size: 24px;
`;

export const QuestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: ${gridSize * 4}px ${gridSize * 6}px;
`;

export const Question = styled.div``;

export const QuestionHeader = styled.h3`
  margin: 0 0 ${sizes.paragraphSpacing}px;
  font-size: 18px;
`;

export const Footer = styled(_Footer)`
  margin-top: ${gridSize * 6}px;
  margin-bottom: ${gridSize * 2}px;
`;
