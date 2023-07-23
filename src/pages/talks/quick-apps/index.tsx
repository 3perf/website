import styled from 'styled-components';
import Layout from '../../../components/Layout';
import { LogoKind } from '../../../components/Logo';
import WidthWrapper from '../../../components/WidthWrapper';
import media from '../../../styles/media';
import { Footer, Nav } from '../styled';

const IFrame = styled.iframe`
  width: 100%;
  height: 565px;

  ${media.small`
    height: 367px;
  `}
`;

export const Head = () => (
  <>
    <title>Building quick apps in 2019 · PerfPerfPerf</title>
    <meta property="og:url" content="https://3perf.com/talks/quick-apps/" />
  </>
);

const QuickAppsPage = () => {
  return (
    <Layout>
      <WidthWrapper>
        <Nav logoKind={LogoKind.Black} />
        <IFrame
          src="https://onedrive.live.com/embed?cid=A2820C2EF7555CB4&amp;resid=A2820C2EF7555CB4%211660501&amp;authkey=AHqpMrgQkHFQKdQ&amp;em=2&amp;wdAr=1.7777777777777777"
          width="962px"
          height="565px"
          frameBorder="0"
        >
          This is an embedded{' '}
          <a target="_blank" rel="noreferrer" href="https://office.com">
            Microsoft Office
          </a>{' '}
          presentation, powered by{' '}
          <a target="_blank" rel="noreferrer" href="https://office.com/webapps">
            Office Online
          </a>
          .
        </IFrame>
        <Footer />
      </WidthWrapper>
    </Layout>
  );
};

export default QuickAppsPage;
