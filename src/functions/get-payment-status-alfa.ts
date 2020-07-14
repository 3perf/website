import type { APIGatewayProxyHandler } from 'aws-lambda';
import { ConsultingDuration } from '../types';
import { getOrderStatusExtended } from './api-wrappers/alfa';
import { parseOrderMetadata } from './common/orderMetadata';

const logger = (...args: any[]) =>
  console.log(`[prepare-payment-form] [${new Date().toISOString()}]`, ...args);

async function getPaymentStatus({ orderId }: GetPaymentStatusParameters) {
  logger('Starting to get the payment status:', {
    orderId,
  });

  const order = await getOrderStatusExtended({ orderId, language: 'en' });
  logger('Retrieved the order:', order);

  const metadata = parseOrderMetadata(
    order.merchantOrderParams.find((i) => i.name === 'metadata')?.value || '{}',
  );
  logger('Parsed the metadata:', metadata);

  return {
    isError: order.actionCode !== 0,
    errorMessage: order.actionCodeDescription,
    duration: metadata.duration,
    isCallRecordingAdded: metadata.isCallRecordingAdded,
    isSummaryAdded: metadata.isSummaryAdded,
    email: metadata.email,
  };
}

export interface GetPaymentStatusParameters {
  orderId: string;
}

export interface GetPaymentStatusResponse {
  isError: boolean;
  errorMessage: string;
  duration: ConsultingDuration;
  isCallRecordingAdded: boolean;
  isSummaryAdded: boolean;
  email: string;
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  logger('Received the request:', { event, context });

  if (!event.queryStringParameters) {
    throw new Error('Query string expected');
  }

  const parameters = (event.queryStringParameters as unknown) as GetPaymentStatusParameters;

  const response: GetPaymentStatusResponse = await getPaymentStatus(parameters);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
