import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';
import { linkActiveStyles, linkStyles } from '../../styles/shared-styles';

export const Intro = styled.div`
  margin-bottom: 20px;
`;

export const PeopleList = styled.div`
  display: flex;

  margin: -12px;

  > * {
    margin: 12px;
  }
`;

export const Person = styled.a`
  display: block;
  color: inherit;
  border-bottom: none;
  line-height: 1;

  &:hover,
  &:focus,
  &:active {
    color: inherit;
  }
`;

export const Photo = styled(GatsbyImage)`
  /* Because gatsby-image uses inline styles */
  display: block !important;
  margin-bottom: 8px;
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

export const Name = styled.div``;

export const Username = styled.span`
  font-size: 0.75em;

  ${linkStyles};

  ${Person}:hover &,
  ${Person}:focus &,
  ${Person}:active & {
    ${linkActiveStyles};
  }
`;
