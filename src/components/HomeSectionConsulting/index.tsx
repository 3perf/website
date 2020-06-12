import * as React from 'react';
import { Container, Header, List, ListItem, ActionButton } from './styled';

const HomeSectionTestimonials = () => (
  <Container>
    <Header>⚡ New: Express consulting ⚡</Header>
    <List>
      <ListItem>Book a time</ListItem>
      <ListItem>Pay with a card</ListItem>
      <ListItem>Learn all about your site’s speed in 60 minutes</ListItem>
    </List>
    <ActionButton href="/consulting/">Improve your perf</ActionButton>
  </Container>
);

export default HomeSectionTestimonials;
