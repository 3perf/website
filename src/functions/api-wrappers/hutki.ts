// Using lossless-json because HutkiGrosh uses BigInts for bill ids
import * as LosslessJSON from 'lossless-json';
import { fetch } from '../prepare-payment-form';

/**
 * Parse the passed JSON, throwing an error with the full object if parsing fails.
 * This is useful because the HutkiGrosh API returns a full-blown HTML page in case of an error.
 */
function safeJsonParse(jsonString: string) {
  try {
    return LosslessJSON.parse(jsonString);
  } catch (e) {
    throw new Error(
      `Parsing the JSON failed: "${e.message}". Passed JSON string: ${jsonString}`,
    );
  }
}

/**
 * Sign in to the HutkiGrosh account. API reference: https://hutkigrosh.by/wp-content/uploads/2017/03/API-servisa-Hutki-Grosh.ru_.pdf
 */
export async function signIn() {
  const response = await fetch('https://hutkigrosh.by/API/v1/Security/LogIn', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: LosslessJSON.stringify({
      user: process.env.HUTKI_USERNAME,
      pwd: process.env.HUTKI_PASSWORD,
    }),
  });

  const text = await response.text();
  const result: boolean = await safeJsonParse(text);

  return result;
}

interface HutkiBillParams {
  eripId: number;
  invId: string;
  dueDt: string;
  addedDt: string;
  fullName: string | null;
  mobilePhone: string | null;
  notifyByMobilePhone: boolean;
  email: string | null;
  notifyByEMail: boolean;
  fullAddress?: string | null;
  amt: number;
  curr: string;
  statusEnum: number;
  products: Array<{
    invItemId: string | null;
    desc: string;
    count: number;
    amt: number;
  }>;
}

/**
 * Create a HutkiGrosh bill. API reference: https://hutkigrosh.by/wp-content/uploads/2017/03/API-servisa-Hutki-Grosh.ru_.pdf
 */
export async function createBill(data: HutkiBillParams) {
  const response = await fetch('https://hutkigrosh.by/API/v1/Invoicing/Bill', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: LosslessJSON.stringify(data),
  });

  const text = await response.text();
  const result: { status: number; billID: number } = await safeJsonParse(text);

  return {
    status: result.status,
    // Normalize the field name
    billId: result.billID,
  };
}

interface HutkiBillResponse {
  billId: LosslessJSON.LosslessNumber;
  eripId: LosslessJSON.LosslessNumber;
  invId: string;
  dueDt: string;
  addedDt: string;
  payedDt: string | null;
  fullName: string | null;
  mobilePhone: string | null;
  notifyByMobilePhone: boolean;
  email: string | null;
  notifyByEMail: boolean;
  fullAddress: string | null;
  amt: LosslessJSON.LosslessNumber;
  curr: string;
  firstPaymentAmt: LosslessJSON.LosslessNumber | null;
  statusEnum: LosslessJSON.LosslessNumber;
  info: string;
  paymentSource: string | null;
  products: Array<{
    invItemId: string | null;
    desc: string;
    count: LosslessJSON.LosslessNumber;
    amt: LosslessJSON.LosslessNumber;
  }>;
  providers: null;
}

/**
 * Get a HutkiGrosh bill. API reference: https://hutkigrosh.by/wp-content/uploads/2017/03/API-servisa-Hutki-Grosh.ru_.pdf
 */
export async function getBill(billId: string) {
  const response = await fetch(
    `https://hutkigrosh.by/API/v1/Invoicing/Bill(${billId})`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  const text = await response.text();
  const result: {
    status: number;
    bill: HutkiBillResponse;
  } = await safeJsonParse(text);

  return result;
}

/**
 * Get the form that would redirect to the payment page. API reference: https://hutkigrosh.by/wp-content/uploads/2017/03/API-servisa-Hutki-Grosh.ru_.pdf
 */
export async function getPaymentForm({
  billId,
  invoiceId,
  returnUrl,
  cancelReturnUrl,
}: {
  billId: number;
  invoiceId: string;
  returnUrl: string;
  cancelReturnUrl: string;
}) {
  const data = {
    billId: billId,
    orderData: {
      eripId: Number(process.env.HUTKI_ERIP_ID),
      spClaimId: invoiceId,
    },
    returnUrl: returnUrl,
    cancelReturnUrl: cancelReturnUrl,
    submitValue: 'Pay',
  };

  const response = await fetch('https://hutkigrosh.by/API/v1/Pay/WebPay', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: LosslessJSON.stringify(data),
  });

  const text = await response.text();
  const result: { status: number; form: string } = await safeJsonParse(text);

  return result;
}
