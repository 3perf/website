import { addMinutes, roundToNearestMinutes } from 'date-fns';
import * as React from 'react';
import { BlinkingColon, ScheduleInsteadButton } from './styled';

// Using en-GB for 24-hour time
const localeToUse = 'en-GB';

const availableFromUTCHours = 12;
const availableToUTCHours = 18;

function getIsAvailable() {
  const now = new Date();

  const isMonWedOrFri = [1, 3, 5].includes(now.getUTCDay());
  const isBetween12And18UTC =
    availableFromUTCHours <= now.getUTCHours() &&
    now.getUTCHours() < availableToUTCHours;

  return isMonWedOrFri && isBetween12And18UTC;
}

function getNowPlus30Minutes() {
  const now = new Date();

  const dateIn30Minutes = roundToNearestMinutes(addMinutes(now, 30), {
    nearestTo: 5,
  });
  const parts = new Intl.DateTimeFormat(localeToUse, {
    hour: 'numeric',
    minute: 'numeric',
  }).formatToParts(dateIn30Minutes);

  return parts;
}

function getAvailabilityTime() {
  const date = new Date();

  date.setUTCHours(availableFromUTCHours, 0, 0, 0);
  const availableFrom = date.toLocaleString(localeToUse, {
    hour: 'numeric',
    minute: 'numeric',
  });
  date.setUTCHours(availableToUTCHours, 0, 0, 0);
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

interface ConsultingAppointmentIn30BlockProps {
  paragraphComponent: string | React.ComponentType;
  onScheduleClick: () => void;
  onAvailabilityChange: (availability: boolean) => void;
}

const ConsultingAppointmentIn30Block = ({
  paragraphComponent: ParagraphComponent,
  onScheduleClick,
  onAvailabilityChange,
}: ConsultingAppointmentIn30BlockProps) => {
  if (typeof window === 'undefined') {
    throw new Error(
      'The ConsultingAppointmentIn30Block component is supposed to be ' +
        'client-rendered only as it depends on the client’s local time.',
    );
  }

  const [isAvailable, setIsAvailable] = React.useState(getIsAvailable());
  const [nowPlus30Minutes, setNowPlus30Minutes] = React.useState(
    getNowPlus30Minutes(),
  );
  const [availabilityTime, setAvailabilityTime] = React.useState(
    getAvailabilityTime(),
  );
  const [timeZone, setTimeZone] = React.useState(getTimeZone());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsAvailable(getIsAvailable());
      setNowPlus30Minutes(getNowPlus30Minutes());
      setAvailabilityTime(getAvailabilityTime());
      setTimeZone(getTimeZone());
    }, 5000);

    return () => clearInterval(interval);
  }, [setIsAvailable, setNowPlus30Minutes, setAvailabilityTime, setTimeZone]);

  React.useEffect(() => {
    onAvailabilityChange(isAvailable);
  }, [isAvailable]);

  if (isAvailable) {
    // For en-GB, `nowPlus30Minutes` looks like
    // [{type: "hour", value: "17"}, {type: "literal", value: ":"}, {type: "minute", value: "36"}]
    const formattedTimeIn30Mins = nowPlus30Minutes.map((part, index) =>
      part.type === 'literal' ? (
        <BlinkingColon key={index}>{part.value}</BlinkingColon>
      ) : (
        part.value
      ),
    );

    return (
      <ParagraphComponent>
        At {formattedTimeIn30Mins} ({timeZone} time). Great for urgent
        questions. You’ll get a Zoom link right after the payment.
      </ParagraphComponent>
    );
  } else {
    return (
      <ParagraphComponent>
        Sorry, this is only available Mon, Wed and Fri{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          {availabilityTime.from}–{availabilityTime.to}
        </span>{' '}
        ({timeZone} time).{' '}
        <ScheduleInsteadButton type="button" onClick={onScheduleClick}>
          Schedule an appointment
        </ScheduleInsteadButton>{' '}
        instead.
      </ParagraphComponent>
    );
  }
};

export default ConsultingAppointmentIn30Block;
