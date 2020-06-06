import type { APIGatewayProxyHandler } from 'aws-lambda';
import { roundToNearestMinutes, addMinutes } from 'date-fns';
import fetch from 'node-fetch';
import { ConsultingDuration, ConsultingAppointmentTime } from '../types';
import { getBill, signIn } from './api-wrappers/hutki';
import { parsePrimaryProductDescription } from './common/hutkiBillProduct';

const logger = (...args: any[]) =>
  console.log(`[handle-payment] [${new Date().toISOString()}]`, ...args);

async function invokeIntegromatHandler({
  email,
  duration,
  appointmentTime,
  startDate,
  endDate,
}: {
  email: string;
  duration: ConsultingDuration;
  appointmentTime: ConsultingAppointmentTime;
  startDate: Date | null;
  endDate: Date | null;
}) {
  if (!process.env.INTEGROMAT_CONSULTING_WEBHOOK) {
    throw new Error('process.env.INTEGROMAT_CONSULTING_WEBHOOK is not defined');
  }

  return fetch(process.env.INTEGROMAT_CONSULTING_WEBHOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      duration,
      appointmentTime,
      startDate: startDate && startDate.toISOString(),
      endDate: endDate && endDate.toISOString(),
    }),
  });
}

function getNowPlus30Minutes() {
  const now = new Date();

  const dateIn30Minutes = roundToNearestMinutes(addMinutes(now, 30), {
    nearestTo: 5,
  });

  return dateIn30Minutes;
}

async function handlePayment(billId: string) {
  logger('Starting to handle the payment:', billId);

  const isSignedIn = await signIn();
  if (isSignedIn) {
    logger('Successfully signed in');
  } else {
    throw new Error('Didn’t sign in');
  }

  const { status: billStatus, bill } = await getBill(billId);
  logger('Retrieved the bill:', { billStatus, bill });

  const email = bill.email;
  if (!email) {
    throw new Error('bill.email is absent');
  }

  const { duration, appointmentTime } = parsePrimaryProductDescription(
    bill.products[0].desc,
  );

  await invokeIntegromatHandler({
    email,
    duration,
    appointmentTime,
    startDate: getNowPlus30Minutes(),
    endDate: addMinutes(getNowPlus30Minutes(), Number(duration)),
  });
  logger('Invoked the integromat handler');
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  logger('Received the request:', { event, context });

  if (
    !(event.queryStringParameters && event.queryStringParameters.purchaseid)
  ) {
    throw new Error('purchaseid expected');
  }

  const billId = event.queryStringParameters.purchaseid;

  await handlePayment(billId);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
