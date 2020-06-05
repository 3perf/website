import { ConsultingDuration, ConsultingAppointmentTime } from '../types';

export function getPrimaryProductPrice(
  duration: ConsultingDuration,
  appointmentTime: ConsultingAppointmentTime,
) {
  let basePrise = 0;

  if (duration === ConsultingDuration.M30) {
    basePrise = 45;
  } else if (duration === ConsultingDuration.M60) {
    basePrise = 90;
  } else if (duration === ConsultingDuration.M90) {
    basePrise = 135;
  }

  if (appointmentTime === ConsultingAppointmentTime.IN_30) {
    basePrise = Math.floor(basePrise * 1.5);
  }

  return basePrise;
}

export function getCallRecordingPrice() {
  return 20;
}

export function getSummaryPrice() {
  return 50;
}

export function calculatePrice(
  duration: ConsultingDuration,
  appointmentTime: ConsultingAppointmentTime,
  isCallRecordingAdded: boolean,
  isSummaryAdded: boolean,
): number {
  let totalPrice = 0;

  totalPrice += getPrimaryProductPrice(duration, appointmentTime);

  if (isCallRecordingAdded) {
    totalPrice += getCallRecordingPrice();
  }

  if (isSummaryAdded) {
    totalPrice += getSummaryPrice();
  }

  return totalPrice;
}
