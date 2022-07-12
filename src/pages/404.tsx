import * as React from 'react';
import Layout from '../components/Layout';
import { LogoKind } from '../components/Logo';
import Nav from '../components/Nav';
import { NavKind } from '../components/NavBase';
import WidthWrapper from '../components/WidthWrapper';
import { BackgroundWrapper, Content, Header, Text } from './404.styled';

const NotFoundPage = () => (
  <Layout>
    <BackgroundWrapper>
      <WidthWrapper>
        <Nav logoKind={LogoKind.White} navKind={NavKind.Light} />

        <Content>
          <Header>Not Found :’(</Header>
          <Text>Oh well. Damn computers, amirite?</Text>
        </Content>
      </WidthWrapper>
    </BackgroundWrapper>
  </Layout>
);

export default NotFoundPage;
