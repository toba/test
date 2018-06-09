import { is, includesAll, HttpStatus } from '@toba/tools';
import { MockResponse } from '../';

export interface ExpectResponse {
   message: () => string;
   pass: boolean;
}

/**
 * Build Jest standard expectation response. The Jest runner will display the
 * incorrect value actually received so that doesn't need to be included in
 * the message.
 *
 * @param pass Whether test passed
 * @param expectation Phrase to display when test fails
 * @param negatedExpectation Phrasing when test is prefixed with `not.`
 */
export const makeResponse = (
   pass: boolean,
   expectation: string,
   negatedExpectation: string
): ExpectResponse =>
   pass
      ? {
           message: () => `expected ${negatedExpectation}`,
           pass
        }
      : {
           message: () => `expected ${expectation}`,
           pass
        };

function toBeLatLng(
   this: jest.MatcherUtils,
   received: number[]
): ExpectResponse {
   const pass =
      is.array<number>(received) &&
      received[0] <= 180 &&
      received[0] >= -180 &&
      received[1] <= 90 &&
      received[1] >= -90;
   const text =
      'to be a two-element array with a number between -180/180 and second number between -90/90';

   return makeResponse(pass, `${received} ${text}`, `${received} not ${text}`);
}

function toBeWithin<T extends number>(
   this: jest.MatcherUtils,
   received: T,
   min: number,
   max: number
): ExpectResponse {
   const pass = received >= min && received <= max;
   const text = `to be within ${min} and ${max}`;

   return makeResponse(pass, `${received} ${text}`, `${received} not ${text}`);
}

function toHaveAllProperties<T extends Object>(
   this: jest.MatcherUtils,
   received: T,
   ...keys: string[]
): ExpectResponse {
   const missing = keys.filter(k => !received.hasOwnProperty(k));
   const pass = missing.length == 0;

   return makeResponse(
      pass,
      `object to have properties ${missing.join(', ')}`,
      `object to not have all properties ${keys.join(', ')}`
   );
}

function toHaveValues<U, T extends Set<U> | Map<any, U>>(
   this: jest.MatcherUtils,
   received: T,
   ...values: U[]
): ExpectResponse {
   const setList = Array.from(received.values());
   const pass = includesAll(setList, ...values);

   return makeResponse(
      pass,
      `Set or Map to have values ${values.join(', ')}`,
      `Set or Map to not have all values ${values.join(', ')}`
   );
}

function toHaveKeyValue<K, V>(
   this: jest.MatcherUtils,
   received: Map<K, V>,
   key: K,
   value: V
): ExpectResponse {
   const pass = received.has(key) && received.get(key) === value;

   return makeResponse(
      pass,
      `Map to have key "${key}" with value "${value}"`,
      `Map not to have key "${key}" with value "${value}"`
   );
}

function toHaveKeys<U, T extends Map<U, any>>(
   this: jest.MatcherUtils,
   received: T,
   ...keys: U[]
): ExpectResponse {
   const setList = Array.from(received.keys());
   const pass = includesAll(setList, ...keys);

   return makeResponse(
      pass,
      `Map to have keys ${keys.join(', ')}`,
      `Map to not have all keys ${keys.join(', ')}"`
   );
}

/**
 * Expect `MockResponse` to have rendered a specific template.
 */
function toRenderTemplate(
   this: jest.MatcherUtils,
   received: MockResponse,
   name: string
): ExpectResponse {
   const pass =
      received.statusCode == HttpStatus.OK &&
      is.value(received.rendered) &&
      received.rendered.template == name;

   return makeResponse(
      pass,
      `response to have template ${name}`,
      `response not to have template ${name}`
   );
}

/**
 * Expect `MockResponse` to have redirected to a specific URL.
 */
function toRedirectTo(
   this: jest.MatcherUtils,
   received: MockResponse,
   url: string
): ExpectResponse {
   const pass =
      is.defined(received, 'redirected') &&
      received.redirected.status == HttpStatus.PermanentRedirect &&
      received.redirected.url == url;

   return makeResponse(
      pass,
      `response to redirect to ${url}`,
      `response not to redirect to ${url}`
   );
}

/**
 * https://facebook.github.io/jest/docs/en/expect.html#expectextendmatchers
 */
expect.extend({
   toBeWithin,
   toBeLatLng,
   toHaveKeys,
   toHaveValues,
   toHaveKeyValue,
   toHaveAllProperties,
   toRenderTemplate,
   toRedirectTo
});
