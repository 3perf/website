import * as React from 'react';
import { calculatePrice } from '../../common/consultingPricing';
import { ConsultingDuration } from '../../types';
import { PayButton, ButtonSpinner } from './styled';

interface ConsultingPaymentBlockProps {
  paragraphComponent: string | React.ComponentType;
  duration: ConsultingDuration;
  isCallRecordingAdded: boolean;
  isSummaryAdded: boolean;
  isSubmitting: boolean;
}

const ConsultingPaymentBlock = ({
  paragraphComponent: ParagraphComponent,
  duration,
  isCallRecordingAdded,
  isSummaryAdded,
  isSubmitting,
}: ConsultingPaymentBlockProps) => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  React.useEffect(() => {
    setIsInitialized(true);
  }, [setIsInitialized]);

  const calculatedPrice = calculatePrice(
    duration,
    isCallRecordingAdded,
    isSummaryAdded,
  );

  const isPaymentDisabled =
    // We’re keeping the button disabled until all client-side code has been initialized.
    // This ensures the customer doesn’t accidentally pay the wrong price
    !isInitialized || isSubmitting;

  const showSpinner = !isInitialized || isSubmitting;

  return (
    <>
      <PayButton type="submit" disabled={isPaymentDisabled}>
        {showSpinner ? <ButtonSpinner /> : `Buy for $${calculatedPrice}`}
      </PayButton>
      <ParagraphComponent>
        Accepting VISA, MasterCard, and Apple Pay. Payments are processed by
        Alfa-Bank (Belarus). We don’t store your card data.
      </ParagraphComponent>
    </>
  );
};

export default ConsultingPaymentBlock;
