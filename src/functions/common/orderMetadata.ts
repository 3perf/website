import { ConsultingDuration } from '../../types';

interface OrderMetadata {
  duration: ConsultingDuration;
  isCallRecordingAdded: boolean;
  isSummaryAdded: boolean;
  email: string;
  isAutomated: boolean;
}

export function stringifyOrderMetadata({
  duration,
  isCallRecordingAdded,
  isSummaryAdded,
  email,
  isAutomated,
}: OrderMetadata) {
  return JSON.stringify({
    duration,
    isCallRecordingAdded,
    isSummaryAdded,
    // Not using the `email` name since that’d automatically substitute
    // the email into the payment form
    customerEmail3Perf: email,
    isAutomated,
  });
}

export function parseOrderMetadata(metadata: string): OrderMetadata {
  const {
    duration,
    isCallRecordingAdded,
    isSummaryAdded,
    customerEmail3Perf: email,
    isAutomated,
  } = JSON.parse(metadata);

  return {
    duration,
    isCallRecordingAdded,
    isSummaryAdded,
    email,
    isAutomated,
  };
}
