import { ConsultingDuration } from '../types';

export function getPrimaryProductPrice(duration: ConsultingDuration) {
  if (duration === ConsultingDuration.M30) {
    return 90;
  } else if (duration === ConsultingDuration.M60) {
    return 180;
  } else if (duration === ConsultingDuration.M90) {
    return 270;
  }

  throw new Error(
    'getPrimaryProductPrice: Unknown duration; must not happen: ' + duration,
  );
}

export function getCallRecordingPrice() {
  return 30;
}

export function getSummaryPrice() {
  return 60;
}

export function calculatePrice(
  duration: ConsultingDuration,
  isCallRecordingAdded: boolean,
  isSummaryAdded: boolean,
): number {
  let totalPrice = 0;

  totalPrice += getPrimaryProductPrice(duration);

  if (isCallRecordingAdded) {
    totalPrice += getCallRecordingPrice();
  }

  if (isSummaryAdded) {
    totalPrice += getSummaryPrice();
  }

  return totalPrice;
}
