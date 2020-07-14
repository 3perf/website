import * as React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../../components/Layout';
import WidthWrapper from '../../../components/WidthWrapper';
import type {
  GetPaymentStatusParameters,
  GetPaymentStatusResponse,
} from '../../../functions/get-payment-status-alfa';
import { ConsultingDuration } from '../../../types';
import {
  BodyBackground,
  FlexWrapper,
  Nav,
  Main,
  Header,
  ErrorMessage,
  Note,
  Footer,
} from './styled';

async function getPaymentStatus(
  params: GetPaymentStatusParameters,
): Promise<GetPaymentStatusResponse> {
  const response = await fetch(
    '/.netlify/functions/get-payment-status-alfa?orderId=' + params.orderId,
  );

  return response.json();
}

const ConsultingSuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = React.useState<string | null>(null);
  const [orderMetadata, setOrderMetadata] = React.useState<{
    duration: ConsultingDuration;
    isCallRecordingAdded: boolean;
    isSummaryAdded: boolean;
    email: string;
  } | null>(null);

  React.useEffect(() => {
    const orderId = new URL(document.location.href).searchParams.get('orderId');
    if (!orderId) {
      return;
    }

    getPaymentStatus({ orderId }).then((paymentStatus) => {
      setPaymentStatus(
        paymentStatus.isError ? paymentStatus.errorMessage : 'Success',
      );
      setOrderMetadata({
        duration: paymentStatus.duration,
        isCallRecordingAdded: paymentStatus.isCallRecordingAdded,
        isSummaryAdded: paymentStatus.isSummaryAdded,
        email: paymentStatus.email,
      });
    });
  }, [setPaymentStatus, setOrderMetadata]);

  let urlParams;
  if (orderMetadata) {
    urlParams = new URLSearchParams();
    for (const [key, value] of Object.entries(orderMetadata)) {
      urlParams.append(key, value ? value.toString() : '');
    }
  }
  const returnLink = urlParams
    ? `/consulting/?${urlParams.toString()}#book`
    : '/consulting/#book';

  return (
    <Layout>
      <Helmet>
        <title>Consulting was not purchased | PerfPerfPerf</title>
      </Helmet>
      <BodyBackground />
      <WidthWrapper>
        <FlexWrapper>
          <Nav />
          <Main>
            <Header>Not pur&shy;cha&shy;sed. 🙅‍♀️</Header>
            <p>
              Looks like your payment wasn’t processed. Here’s the error we’ve
              got:
            </p>
            <ErrorMessage>{paymentStatus || <em>Loading...</em>}</ErrorMessage>
            <p>
              <a href={returnLink}>← Try again</a>
            </p>
            <Note>
              Still can’t pay? Drop Ivan a message in{' '}
              <a href="https://twitter.com/iamakulov">Twitter</a> or{' '}
              <a href="https://t.me/iamakulov">Telegram</a>, and we’ll figure it
              out.
            </Note>
          </Main>

          <Footer license={false} />
        </FlexWrapper>
      </WidthWrapper>
    </Layout>
  );
};

export default ConsultingSuccessPage;
