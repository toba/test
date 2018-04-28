import { is, includesAll } from '@toba/tools';

export interface ExpectResponse {
   message: () => string;
   pass: boolean;
}

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

   return pass
      ? {
           message: () => `expected ${received} not ${text}`,
           pass
        }
      : {
           message: () => `expected ${received} ${text}`,
           pass
        };
}

function toBeWithin<T extends number>(
   this: jest.MatcherUtils,
   received: T,
   min: number,
   max: number
): ExpectResponse {
   const pass = received >= min && received <= max;
   const text = `to be within ${min} and ${max}`;
   return pass
      ? {
           message: () => `expected ${received} not ${text}`,
           pass
        }
      : {
           message: () => `expected ${received} ${text}`,
           pass
        };
}

function toHaveAllProperties<T extends Object>(
   this: jest.MatcherUtils,
   received: T,
   ...keys: string[]
): ExpectResponse {
   const missing = keys.filter(k => !received.hasOwnProperty(k));
   const pass = missing.length == 0;

   return pass
      ? {
           message: () =>
              `expected object to not have all properties ${keys.join(', ')}`,
           pass
        }
      : {
           message: () =>
              `expected object to have properties ${missing.join(', ')}`,
           pass
        };
}

function toHaveValues<U, T extends Set<U> | Map<any, U>>(
   this: jest.MatcherUtils,
   received: T,
   ...values: U[]
): ExpectResponse {
   const setList = Array.from(received.values());
   const pass = includesAll(setList, ...values);

   return pass
      ? {
           message: () =>
              `expected Set or Map to not have all values ${values.join(', ')}`,
           pass
        }
      : {
           message: () =>
              `expected Set or Map to have values ${values.join(', ')}`,
           pass
        };
}

function toHaveKeyValue<K, V>(
   this: jest.MatcherUtils,
   received: Map<K, V>,
   key: K,
   value: V
): ExpectResponse {
   const pass = received.has(key) && received.get(key) === value;

   return pass
      ? {
           message: () =>
              `expected Map not to have key "${key}" with value "${value}"`,
           pass
        }
      : {
           message: () =>
              `expected Map to have key "${key}" with value "${value}"`,
           pass
        };
}

function toHaveKeys<U, T extends Map<U, any>>(
   this: jest.MatcherUtils,
   received: T,
   ...keys: U[]
): ExpectResponse {
   const setList = Array.from(received.keys());
   const pass = includesAll(setList, ...keys);

   return pass
      ? {
           message: () =>
              `expected Map to not have all keys ${keys.join(', ')}`,
           pass
        }
      : {
           message: () => `expected Map to have keys ${keys.join(', ')}`,
           pass
        };
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
   toHaveAllProperties
});
