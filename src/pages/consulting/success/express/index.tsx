import * as React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../../../components/Layout';
import WidthWrapper from '../../../../components/WidthWrapper';
import {
  BodyBackground,
  FlexWrapper,
  Nav,
  Main,
  Header,
  Note,
  Footer,
} from '../styled';

const ConsultingSuccessPage = () => {
  const [emailFromQuery, setEmailFromQuery] = React.useState<string | null>(
    null,
  );
  React.useEffect(() => {
    const email = new URL(document.location.href).searchParams.get('email');
    setEmailFromQuery(email);
  });

  return (
    <Layout>
      <Helmet>
        <title>Consulting was purchased | PerfPerfPerf</title>
      </Helmet>
      <BodyBackground />
      <WidthWrapper>
        <FlexWrapper>
          <Nav />
          <Main>
            <Header>Pur&shy;cha&shy;sed. 🎉</Header>
            <p>
              We’ve sent the meeting invite to your{' '}
              {emailFromQuery && <strong>{emailFromQuery}</strong>} email.
            </p>
            <p>
              Please check that you have <a href="https://zoom.us/">Zoom</a>{' '}
              installed – we’ll need it for the call.
            </p>
            <p>Chat soon!</p>
            <Note>
              Any issues? Drop Ivan a message in{' '}
              <a href="https://twitter.com/iamakulov">Twitter</a> or{' '}
              <a href="https://t.me/iamakulov">Telegram</a>.
            </Note>
          </Main>

          <Footer license={false} />
        </FlexWrapper>
      </WidthWrapper>
    </Layout>
  );
};

export default ConsultingSuccessPage;
