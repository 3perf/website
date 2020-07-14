import type { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import { ConsultingDuration } from '../types';
import { getOrderStatusExtended } from './api-wrappers/alfa';
import { parseOrderMetadata } from './common/orderMetadata';

const logger = (...args: any[]) =>
  console.log(`[handle-payment-alfa] [${new Date().toISOString()}]`, ...args);

async function invokeIntegromatHandler({
  email,
  duration,
}: {
  email: string;
  duration: ConsultingDuration;
}) {
  if (!process.env.INTEGROMAT_CONSULTING_WEBHOOK_ALFA) {
    throw new Error(
      'process.env.INTEGROMAT_CONSULTING_WEBHOOK_ALFA is not defined',
    );
  }

  return fetch(process.env.INTEGROMAT_CONSULTING_WEBHOOK_ALFA, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      duration,
    }),
  });
}

async function handlePayment(orderId: string) {
  logger('Starting to handle the payment:', orderId);

  const order = await getOrderStatusExtended({ orderId });
  logger('Retrieved the order:', order);

  const metadata = parseOrderMetadata(
    order.merchantOrderParams.find((i) => i.name === 'metadata')?.value || '{}',
  );

  if (!metadata.isAutomated) {
    logger('The order wasn’t created by the website; skipping');
    return;
  }

  const email = metadata.email;
  if (!email) {
    throw new Error('metadata.email is absent');
  }

  await invokeIntegromatHandler({
    email,
    duration: metadata.duration,
  });
  logger('Invoked the integromat handler');
}

enum AlfaOperation {
  Approved = 'approved',
  Deposited = 'deposited',
  Reversed = 'reversed',
  Refunded = 'refunded',
  DeclinedByTimeout = 'declinedByTimeout',
}

enum AlfaOperationStatus {
  Success = '1',
  Error = '0',
}

interface AlfaWebhookParameters {
  mdOrder: string; // Alfa order ID
  orderNumber: string; // Our invoice ID
  operation: AlfaOperation;
  status: AlfaOperationStatus;
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  logger('Received the request:', { event, context });

  if (!event.queryStringParameters) {
    throw new Error('The query string is required.');
  }

  const params = (event.queryStringParameters as unknown) as AlfaWebhookParameters;

  if (
    !(
      params.operation === AlfaOperation.Deposited &&
      params.status === AlfaOperationStatus.Success
    )
  ) {
    // We don’t support handling other operations, so let’s skip them
    logger('Unsupported operation; skipping');
    return {
      statusCode: 200,
      body: JSON.stringify({ result: 'skipped' }),
    };
  }

  await handlePayment(params.mdOrder);

  return {
    statusCode: 200,
    body: JSON.stringify({ result: 'success' }),
  };
};
