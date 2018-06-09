import { MockAuth, useGetter } from './mock-oauth';

const create = () =>
   new MockAuth(
      'requestTokenUrl',
      'accessTokenUrl',
      'apiKey',
      'secret',
      'verion',
      'callbackUrl',
      'hashing'
   );

test('mocks file retrieval', () => {
   const oauth = create();
   expect(oauth).toBeDefined();

   const fn = jest.fn();

   oauth.get('good', 'accessToken', 'secret', fn);

   // callback function shouldn't be called since there's no actual getter
   // defined
   expect(fn).toHaveBeenCalledTimes(0);
});

test('accepts custom method for mocked file retrieval', () => {
   const oauth = create();
   const getter = (url: string, fn: (err: any, body: string) => void) => {
      if (url == 'good') {
         fn(null, url);
      } else {
         fn('bad', null);
      }
   };

   useGetter(getter);

   oauth.get('good', 'accessToken', 'secret', (err: any, body: string) => {
      expect(err).toBeNull();
      expect(body).toBe('good');
   });

   oauth.get('not-good', 'accessToken', 'secret', (err: any, body: string) => {
      expect(err).toBe('bad');
      expect(body).toBeNull();
   });
});
