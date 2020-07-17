import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

interface AlfaError {
  errorCode: string;
  errorMessage: string;
}

function isAlfaError(data: any): data is AlfaError {
  return 'errorCode' in data && data.errorCode !== '0';
}

function verifyNotError<T>(data: T | AlfaError): T | never {
  if (isAlfaError(data)) {
    throw new Error(
      `Alfa: got an error: code ${data.errorCode}, message: ${data.errorMessage}`,
    );
  }

  return data;
}

/////////////////////////////////////////////////////////////

interface AlfaRegisterOrderParams {
  orderNumber: string;
  amount: number;
  currency?: number;
  returnUrl: string;
  failUrl?: string;
  description?: string;
  language?: 'en' | 'ru';
  pageView?: 'DESKTOP' | 'MOBILE' | string;
  clientId?: string;
  merchantLogin?: string;
  jsonParams?: {
    [name: string]: string;
  };
  sessionTimeoutSecs?: number;
  expirationDate?: string;
  bindingId?: string;
  features?: 'AUTO_PAYMENT' | 'FORCE_TDS' | 'FORCE_SSL' | 'FORCE_FULL_TDS';
  email?: string;
  phone?: string;
}

interface AlfaRegisterOrderResponse {
  orderId: string;
  formUrl: string;
}

/**
 * Register an order and get the payment form.
 * API reference: https://alfa-biz.by/acquiring/docs/merchantmanual.pdf → 8.2.1
 */
export async function registerOrder(data: AlfaRegisterOrderParams) {
  const body = new URLSearchParams();
  body.append('userName', process.env.ALFA_USERNAME as string);
  body.append('password', process.env.ALFA_PASSWORD as string);
  for (const [key, value] of Object.entries(data)) {
    if (key === 'jsonParams') {
      body.append(key, JSON.stringify(value));
    } else {
      body.append(key, value);
    }
  }

  const response = await fetch(
    'https://ecom.alfabank.by/payment/rest/register.do',
    { method: 'POST', body },
  );

  const result: AlfaRegisterOrderResponse = verifyNotError(
    await response.json(),
  );

  return result;
}

/////////////////////////////////////////////////////////////

type AlfaGetOrderStatusExtendedParams = (
  | {
      orderId: string;
    }
  | { orderNumber: string }
) & { language?: 'en' | 'ru' };

interface AlfaGetOrderStatusExtendedResponse {
  orderNumber: string;
  orderStatus?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  actionCode: number;
  actionCodeDescription: string;
  amount: number;
  currency?: number;
  date: string;
  orderDescription?: string;
  ip: string;
  authRefNum?: string;
  refundedDate?: string;
  merchantOrderParams: Array<{
    name: string;
    value: string;
  }>;
  cardAuthInfo?: object;
  secureAuthInfo?: object;
  bindingInfo?: object;
  paymentAmountInfo?: object;
  bankInfo?: object;
}

/**
 * Get an extended information about an order.
 * API reference: https://alfa-biz.by/acquiring/docs/merchantmanual.pdf → 8.2.7
 */
export async function getOrderStatusExtended(
  data: AlfaGetOrderStatusExtendedParams,
) {
  const body = new URLSearchParams();
  body.append('userName', process.env.ALFA_USERNAME as string);
  body.append('password', process.env.ALFA_PASSWORD as string);
  for (const [key, value] of Object.entries(data)) {
    body.append(key, value || '');
  }

  const response = await fetch(
    'https://ecom.alfabank.by/payment/rest/getOrderStatusExtended.do',
    { method: 'POST', body },
  );

  const result: AlfaGetOrderStatusExtendedResponse = verifyNotError(
    await response.json(),
  );

  return result;
}
