import { MockResponse } from '../index';
import { HttpStatus } from '@toba/tools';

const res = new MockResponse();

beforeEach(() => res.reset());

test('allows setting and reading the HTTP status', () => {
   res.status(HttpStatus.NotFound);
   expect(res.httpStatus).toBe(HttpStatus.NotFound);
});

test('accepts headers', () => {
   res.setHeader('Cache-Control', 'no-cache');
   res.setHeader('expires', 'Tue, 01 Jan 1980 1:00:00 GMT');
   res.setHeader('pragma', 'no-cache');

   expect(res.headers).toHaveProperty('pragma', 'no-cache');

   res.set({
      'Fake-Header1': 'header-value1',
      'Fake-Header2': 'header-value2'
   });

   expect(res.headers).toHaveProperty('Fake-Header1', 'header-value1');
   expect(res.headers).toHaveProperty('Fake-Header2', 'header-value2');
});

test('can be written to', () => {
   const html = '<html><head></head><body>Test Page</body></html>';
   res.write(html);
   expect(res.content).toBe(html);
});

test('captures redirects', () => {
   res.redirect(HttpStatus.PermanentRedirect, 'url');
   expect(res.redirected.status).toBe(HttpStatus.PermanentRedirect);
   expect(res.redirected.url).toBe('url');
});

test('simulates template rendering', done => {
   res.render('template', { key1: 'value1', key2: 'value2' }, (err, text) => {
      expect(err).toBeNull();
      expect(res.rendered).toHaveProperty('template', 'template');
      expect(res.rendered).toHaveProperty('options');
      expect(res.rendered.options).toHaveProperty('key1', 'value1');
      expect(res.rendered.options).toHaveProperty('key2', 'value2');
      done();
   });
});

test('provides a 404 convenience method', () => {
   res.notFound();
   expect(res.httpStatus).toBe(HttpStatus.NotFound);
});

test('tracks whether response is ended', () => {
   res.end();
   expect(res.ended).toBe(true);
});

test('can be reset and re-used', () => {
   res.reset();
   expect(res.ended).toBe(false);
   expect(res.httpStatus).toBe(HttpStatus.OK);
});
