import { MockAuth, useOAuthGetter } from './mock-oauth';

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
   const getter = (
      url: string,
      fn: (err: any, body: string | null) => void
   ) => {
      if (url == 'good') {
         fn(null, url);
      } else {
         fn('bad', null);
      }
   };

   useOAuthGetter(getter);

   oauth.get('good', 'accessToken', 'secret', (err: any, body: string) => {
      expect(err).toBeNull();
      expect(body).toBe('good');
   });

   oauth.get('not-good', 'accessToken', 'secret', (err: any, body: string) => {
      expect(err).toBe('bad');
      expect(body).toBeNull();
   });
});

test('retrieves request token', () => {
   const oauth = create();

   oauth.getOAuthRequestToken((err, token, _secret, _qs) => {
      expect(err).toBeNull();
      expect(token).toBe('mock-request-token');
   });
});

test('retrieves access token', () => {
   const oauth = create();

   oauth.getOAuthAccessToken(
      'request-token',
      'secret',
      (err, token, _secret, _qs) => {
         expect(err).toBeNull();
         expect(token).toBe('mock-access-token');
      }
   );
});
