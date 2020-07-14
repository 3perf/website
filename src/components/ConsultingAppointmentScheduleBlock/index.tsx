import { addDays, addHours, differenceInHours } from 'date-fns';
import * as React from 'react';

// Using en-GB for 24-hour time
const localeToUse = 'en-GB';

// Consulting is done Mon-Fri 11-18 GMT time
function isDatetimeAvailable(datetime: Date) {
  const isMonWedOrFri = [1, 2, 3, 4, 5].includes(datetime.getUTCDay());
  const isBetween12And18UTC =
    11 <= datetime.getUTCHours() && datetime.getUTCHours() <= 18;

  return isMonWedOrFri && isBetween12And18UTC;
}

function getAvailabilityTime() {
  const date = new Date();

  date.setUTCHours(9, 0, 0, 0);
  const availableFrom = date.toLocaleString(localeToUse, {
    hour: 'numeric',
    minute: 'numeric',
  });
  date.setUTCHours(18, 0, 0, 0);
  const availableTo = date.toLocaleString(localeToUse, {
    hour: 'numeric',
    minute: 'numeric',
  });

  return {
    from: availableFrom,
    to: availableTo,
  };
}

function getTimeZone() {
  // This now looks like “Europe/Minsk”, “America/Argentina/Buenos_Aires”, or “UTC”
  // Full list of timezone names: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  const fullTimeZoneName = Intl.DateTimeFormat(localeToUse).resolvedOptions()
    .timeZone;

  const readableTimeZone = fullTimeZoneName
    // Split into parts
    .split('/')
    // Get the last part (city name)
    .reverse()[0]
    // Replace `_` with ` `
    .replace(/_/g, ' ');

  return readableTimeZone;
}

// Let’s use a simplified implementation until we integrate a calendar API
function getClosestSpot() {
  const now = new Date();

  // In non-urgent consulting, the closest spot is always at least one day away from now
  let closestAvailableDate = addDays(now, 1);

  // This can’t be too computationally expensive, right?
  while (!isDatetimeAvailable(closestAvailableDate)) {
    closestAvailableDate = addHours(closestAvailableDate, 1);
  }

  return differenceInHours(closestAvailableDate, now);
}

interface ConsultingAppointmentScheduleBlockProps {
  paragraphComponent: string | React.ComponentType;
}

const ConsultingAppointmentScheduleBlock = ({
  paragraphComponent: ParagraphComponent,
}: ConsultingAppointmentScheduleBlockProps) => {
  const [availabilityTime, setAvailabilityTime] = React.useState({
    from: '12:00',
    to: '21:00',
  });
  const [timeZone, setTimeZone] = React.useState('Minsk');
  const [closestSpot, setClosestSpot] = React.useState<number | null>(null);

  React.useEffect(() => {
    setAvailabilityTime(getAvailabilityTime());
    setTimeZone(getTimeZone());
    setClosestSpot(getClosestSpot());

    const interval = setInterval(() => {
      setAvailabilityTime(getAvailabilityTime());
      setTimeZone(getTimeZone());
      setClosestSpot(getClosestSpot());
    }, 5000);

    return () => clearInterval(interval);
  }, [setAvailabilityTime, setTimeZone, setClosestSpot]);

  return (
    <>
      <ParagraphComponent>
        Closest available slot: in {closestSpot ? `~${closestSpot}` : '•••'}h.
        Available times: Mon-Fri {availabilityTime.from}–{availabilityTime.to} (
        {timeZone} time).
      </ParagraphComponent>
      <ParagraphComponent>
        You’ll get a link to choose the time right after the payment.
      </ParagraphComponent>
    </>
  );
};

export default ConsultingAppointmentScheduleBlock;
