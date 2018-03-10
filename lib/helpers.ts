interface ExpectResponse {
   message: () => string;
   pass: boolean;
}

/**
 * https://facebook.github.io/jest/docs/en/expect.html#expectextendmatchers
 */
expect.extend({
   toBeWithin(received: number, min: number, max: number): ExpectResponse {
      const pass = received >= min && received <= max;
      return pass
         ? {
              message: () =>
                 `expected ${received} not to be within ${min} and ${max}`,
              pass
           }
         : {
              message: () =>
                 `expected ${received} to be within ${min} and ${max}`,
              pass
           };
   },
   toHaveAllProperties(received: Object, ...keys: string[]): ExpectResponse {
      const missing = keys.filter(k => !received.hasOwnProperty(k));
      const pass = missing.length == 0;

      return pass
         ? {
              message: () =>
                 `expected object to not have all properties ${keys.join(
                    ', '
                 )}`,
              pass
           }
         : {
              message: () =>
                 `expected object to have properties ${missing.join(', ')}`,
              pass
           };
   }
});