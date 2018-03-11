/**
 * Extend default Jest matcher list.
 * https://stackoverflow.com/questions/43667085/extending-third-party-module-that-is-globally-exposed
 */
declare namespace jest {
   interface Matchers {
      toBeWithin: typeof toBeWithin;
      toHaveAllProperties: typeof toHaveAllProperties;
   }
}

interface ExpectResponse {
   message: () => string;
   pass: boolean;
}

export function toBeWithin(
   received: number,
   min: number,
   max: number
): ExpectResponse {
   const pass = received >= min && received <= max;
   return pass
      ? {
           message: () =>
              `expected ${received} not to be within ${min} and ${max}`,
           pass
        }
      : {
           message: () => `expected ${received} to be within ${min} and ${max}`,
           pass
        };
}

export function toHaveAllProperties(
   received: Object,
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

/**
 * https://facebook.github.io/jest/docs/en/expect.html#expectextendmatchers
 */
expect.extend({
   toBeWithin,
   toHaveAllProperties
});
