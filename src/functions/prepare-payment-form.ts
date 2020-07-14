import type { APIGatewayProxyHandler } from 'aws-lambda';
import { format } from 'date-fns';
import { calculatePrice } from '../common/consultingPricing';
import { ConsultingDuration } from '../types';
import { registerOrder } from './api-wrappers/alfa';
import { stringifyOrderMetadata } from './common/orderMetadata';

const logger = (...args: any[]) =>
  console.log(`[prepare-payment-form] [${new Date().toISOString()}]`, ...args);

function generateInvoiceId() {
  // The length of the invoice ID is limited to 10 chars by WebPay
  return format(new Date(), 'yy-MM-dd-HH-mm-ss');
}

async function getPaymentFormUrl({
  duration,
  isCallRecordingAdded,
  isSummaryAdded,
  email,
}: PreparePaymentFormParameters) {
  logger('Starting to prepare the payment form:', {
    duration,
    isCallRecordingAdded,
    isSummaryAdded,
    email,
  });

  const invoiceId = generateInvoiceId();
  logger('Generated the invoice id:', invoiceId);

  const returnUrl =
    process.env.ALFA_RETURN_URL_REGULAR + '?email=' + encodeURIComponent(email);

  const failUrl = process.env.ALFA_FAIL_URL as string;

  const { orderId, formUrl } = await registerOrder({
    amount:
      calculatePrice(duration, isCallRecordingAdded, isSummaryAdded) * 100, // * 100 because the amount is in cents
    orderNumber: invoiceId,
    returnUrl,
    failUrl,
    currency: 840, // USD per ISO4217
    language: 'en',
    jsonParams: {
      metadata: stringifyOrderMetadata({
        duration,
        isCallRecordingAdded,
        isSummaryAdded,
        email,
        isAutomated: true,
      }),
    },
  });
  logger('Got the order ID and the form URL:', { orderId, formUrl });

  return formUrl;
}

export interface PreparePaymentFormParameters {
  duration: ConsultingDuration;
  isCallRecordingAdded: boolean;
  isSummaryAdded: boolean;
  email: string;
}

export interface PreparePaymentFormResponse {
  formUrl: string;
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  logger('Received the request:', { event, context });

  if (!event.body) {
    throw new Error('Body expected');
  }

  const parameters: PreparePaymentFormParameters = JSON.parse(event.body);

  const response: PreparePaymentFormResponse = {
    formUrl: await getPaymentFormUrl(parameters),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
