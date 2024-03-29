import { RouteComponentProps } from '@reach/router';
import { parse } from 'query-string';
import Layout from '../../components/Layout';
import { LogoKind } from '../../components/Logo';
import WidthWrapper from '../../components/WidthWrapper';
import {
  Background,
  Container,
  Footer,
  Header,
  MailchimpSubscribe,
  Nav,
} from './styled';

const getEmailFromQueryString = (queryString: string) => {
  const email = parse(queryString).email;

  if (!email) {
    return undefined;
  }

  // `email` may be an array if there’re multiple `&email=` specified
  if (Array.isArray(email)) {
    return email[0];
  }

  return email;
};

export const Head = () => (
  <>
    <title>Subscribe · PerfPerfPerf</title>
  </>
);

const SubscribePage = ({ location }: RouteComponentProps) => {
  return (
    <Layout>
      <Background>
        <WidthWrapper>
          <Container>
            <div>
              <Nav
                logoKind={LogoKind.White}
                primaryItems={[]}
                secondaryItems={[]}
              />
              <Header>
                We’re Perf&shy;Perf&shy;Perf. We teach per&shy;for&shy;mance.
              </Header>
            </div>
            <div>
              <MailchimpSubscribe
                text="Performance articles, case studies, and more. Subscribe:"
                email={location && getEmailFromQueryString(location.search)}
              />
              <Footer
                license={false}
                extraContent={
                  <span>
                    {' '}
                    · Background:{' '}
                    <a href="https://www.flickr.com/photos/blueforce4116/1398245798/">
                      blueforce4116/Flickr
                    </a>
                  </span>
                }
              />
            </div>
          </Container>
        </WidthWrapper>
      </Background>
    </Layout>
  );
};

export default SubscribePage;
