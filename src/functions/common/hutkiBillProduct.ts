import { ConsultingDuration, ConsultingAppointmentTime } from '../../types';

export function generatePrimaryProductDescription(
  duration: ConsultingDuration,
  appointmentTime: ConsultingAppointmentTime,
) {
  // Note: this should be reversible so we can parse it with `parsePrimaryProductDescription`
  return (
    (appointmentTime === ConsultingAppointmentTime.IN_30
      ? 'Urgent web performance consulting'
      : 'Web performance consulting') + ` - ${duration} min`
  );
}

export function parsePrimaryProductDescription(description: string) {
  const matches = /- (\d\d) min/.exec(description);
  if (!matches) {
    throw new Error(
      'Cannot extract duration from the product description: ' + description,
    );
  }

  return {
    duration: matches[1] as ConsultingDuration,
    appointmentTime: description.includes('Urgent')
      ? ConsultingAppointmentTime.IN_30
      : ConsultingAppointmentTime.SCHEDULE,
  };
}
