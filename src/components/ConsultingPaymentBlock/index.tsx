import * as React from 'react';
import { calculatePrice } from '../../common/consultingPricing';
import { ConsultingDuration, ConsultingAppointmentTime } from '../../types';
import { PayButton, ButtonSpinner } from './styled';

interface AlfaApiResponse {
  rates: Array<{
    rate: number;
    iso: string;
    code: number;
    quantity: number;
    date: string;
    name: string;
  }>;
}

async function fetchUsdBynExchangeRate() {
  const response = await fetch(
    'https://developerhub.alfabank.by:8273/partner/1.0.1/public/nationalRates?currencyCode=840',
  );
  const data: AlfaApiResponse = await response.json();
  return data.rates[0].rate;
}

interface ConsultingPaymentBlockProps {
  paragraphComponent: string | React.ComponentType;
  duration: ConsultingDuration;
  appointmentTime: ConsultingAppointmentTime;
  isCallRecordingAdded: boolean;
  isSummaryAdded: boolean;
  is30MinAppointmentAvailable: boolean;
  isSubmitting: boolean;
}

const ConsultingPaymentBlock = ({
  paragraphComponent: ParagraphComponent,
  duration,
  appointmentTime,
  isCallRecordingAdded,
  isSummaryAdded,
  is30MinAppointmentAvailable,
  isSubmitting,
}: ConsultingPaymentBlockProps) => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  React.useEffect(() => {
    setIsInitialized(true);
  }, [setIsInitialized]);

  const [exchangeRate, setExchangeRate] = React.useState<number | null>(null);
  React.useEffect(() => {
    fetchUsdBynExchangeRate().then(setExchangeRate);

    const hourInMs = 60 * 60 * 1000;
    const interval = setInterval(() => {
      fetchUsdBynExchangeRate().then(setExchangeRate);
    }, hourInMs);

    return () => clearInterval(interval);
  }, [setExchangeRate]);

  const calculatedPrice = calculatePrice(
    duration,
    appointmentTime,
    isCallRecordingAdded,
    isSummaryAdded,
  );
  const bynPrice = exchangeRate
    ? Math.round(calculatedPrice * exchangeRate)
    : null;

  const isPaymentDisabled =
    // We’re keeping the button disabled until all client-side code has been initialized.
    // This ensures the customer doesn’t accidentally pay the wrong price
    !isInitialized ||
    (appointmentTime === ConsultingAppointmentTime.IN_30 &&
      !is30MinAppointmentAvailable) ||
    isSubmitting;

  const showSpinner = !isInitialized || isSubmitting;

  return (
    <>
      <PayButton type="submit" disabled={isPaymentDisabled}>
        {showSpinner ? <ButtonSpinner /> : `Buy for $${calculatedPrice}`}
      </PayButton>
      <ParagraphComponent>
        You’ll be charged in BYN (Belarusian rubles).{' '}
        <a
          href={`https://www.google.com/search?q=${calculatedPrice}+usd+to+byn`}
          target="_blank"
          rel="noreferrer"
        >
          Right now
        </a>
        , ${calculatedPrice} ≈ {bynPrice ?? '•••'} BYN.
      </ParagraphComponent>
    </>
  );
};

export default ConsultingPaymentBlock;
