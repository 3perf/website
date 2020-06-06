import type { APIGatewayProxyHandler } from 'aws-lambda';
import cheerio from 'cheerio';
import { addDays, format } from 'date-fns';
import parser from 'fast-xml-parser';
import fetchCookie from 'fetch-cookie';
import nodeFetch from 'node-fetch';
import {
  getPrimaryProductPrice,
  getCallRecordingPrice,
  getSummaryPrice,
  calculatePrice,
} from '../common/consultingPricing';
import { ConsultingDuration, ConsultingAppointmentTime } from '../types';
import { signIn, createBill, getPaymentForm } from './api-wrappers/hutki';
import { generatePrimaryProductDescription } from './common/hutkiBillProduct';

const logger = (...args: any[]) =>
  console.log(`[prepare-payments] [${new Date().toISOString()}]`, ...args);

export const fetch = fetchCookie(nodeFetch) as typeof nodeFetch;

function generateInvoiceId() {
  // The length of the invoice ID is limited to 10 chars by WebPay
  return format(new Date(), 'yyMMddHHmm');
}

/**
 * Extract the proper form HTML out of the HutkiGrosh response.
 *
 * We need it because the getPaymentForm() method returns a form encoded in the weirdest way possible:
 * {
 *   "status": 0,
 *   "form": "<string><![CDATA[<!--HutkiGrosh: Исходные данные для формы оплаты на сайте WebPay-->\r\n<form action=\"https://payment.webpay.by/services\" method=\"post\">\r\n <input type=\"hidden\" name=\"*scart\" />... <input type=\"submit\" value=\"Pay\" />\r\n</form>]]></string>"
 * }
 */
function parseForm(formString: string) {
  const jsonObj: { string: string } = parser.parse(formString, {}, true);

  const form = jsonObj.string.trim();

  const $ = cheerio.load(form);

  // Remove the old language_id parameter, if any
  $('input[name="wsb_language_id"]').remove();
  // Remove the mistyped “wsb_langiage_id” parameter from Hutki as well
  $('input[name="wsb_langiage_id"]').remove();
  // Force WebPay to use English for the payment page & emails
  $('form').append(
    '<input type="hidden" name="wsb_language_id" value="english" />',
  );

  return $.html();
}

async function createBillForConsulting({
  duration,
  appointmentTime,
  isCallRecordingAdded,
  isSummaryAdded,
  email,
  invoiceId,
}: {
  duration: ConsultingDuration;
  appointmentTime: ConsultingAppointmentTime;
  isCallRecordingAdded: boolean;
  isSummaryAdded: boolean;
  email: string;
  invoiceId: string;
}) {
  const products = [
    {
      invItemId: '',
      desc: generatePrimaryProductDescription(duration, appointmentTime),
      count: 1,
      amt: getPrimaryProductPrice(duration, appointmentTime),
    },
    isCallRecordingAdded
      ? {
          invItemId: '',
          desc: 'Call recording',
          count: 1,
          amt: getCallRecordingPrice(),
        }
      : null,
    isSummaryAdded
      ? {
          invItemId: '',
          desc: 'Summary of recommendations, in text',
          count: 1,
          amt: getSummaryPrice(),
        }
      : null,
  ].filter(<T>(i: T): i is NonNullable<T> => !!i);

  return createBill({
    eripId: Number(process.env.HUTKI_ERIP_ID),
    invId: invoiceId,
    // .NET date format ↓
    dueDt: `/Date(${addDays(new Date(), 3).getTime()}+0300)/`,
    addedDt: `/Date(${new Date().getTime()}+0300)/`,
    email: email,
    amt: calculatePrice(
      duration,
      appointmentTime,
      isCallRecordingAdded,
      isSummaryAdded,
    ),
    curr: 'USD',
    products: products,
    fullName: null,
    mobilePhone: null,
    notifyByMobilePhone: false,
    notifyByEMail: false,
    // Hard-coded based on examples ↓
    statusEnum: 0,
  });
}

async function preparePaymentForm({
  duration,
  appointmentTime,
  isCallRecordingAdded,
  isSummaryAdded,
  email,
}: PreparePaymentFormParameters) {
  logger('Starting to prepare the payment form:', {
    duration,
    appointmentTime,
    isCallRecordingAdded,
    isSummaryAdded,
    email,
  });

  const isSignedIn = await signIn();
  if (isSignedIn) {
    logger('Successfully signed in');
  } else {
    throw new Error('Didn’t sign in');
  }

  const invoiceId = generateInvoiceId();
  logger('Generated the invoice id:', invoiceId);

  const { status: billStatus, billId } = await createBillForConsulting({
    duration,
    appointmentTime,
    isCallRecordingAdded,
    isSummaryAdded,
    email,
    invoiceId,
  });
  logger('Created the bill:', { billStatus, billId });

  const returnUrl =
    (appointmentTime === ConsultingAppointmentTime.IN_30
      ? process.env.HUTKI_RETURN_URL_IN30
      : process.env.HUTKI_RETURN_URL_REGULAR) +
    '?email=' +
    encodeURIComponent(email);
  const cancelReturnUrl = process.env.HUTKI_CANCEL_RETURN_URL as string;
  const { status: formStatus, form } = await getPaymentForm({
    billId,
    invoiceId,
    returnUrl,
    cancelReturnUrl,
  });
  logger('Got the payment form:', { formStatus, form });

  const parsedForm = parseForm(form);
  logger('Parsed the form:', parsedForm);

  return parsedForm;
}

export interface PreparePaymentFormParameters {
  duration: ConsultingDuration;
  appointmentTime: ConsultingAppointmentTime;
  isCallRecordingAdded: boolean;
  isSummaryAdded: boolean;
  email: string;
}

export interface PreparePaymentFormResponse {
  form: string;
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  logger('Received the request:', { event, context });

  if (!event.body) {
    throw new Error('Body expected');
  }

  const parameters: PreparePaymentFormParameters = JSON.parse(event.body);

  const response: PreparePaymentFormResponse = {
    form: await preparePaymentForm(parameters),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
