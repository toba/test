import '../index';
import { HttpStatus, Header } from '@toba/tools';
import { MockResponse, MockRequest } from '../index';

const res = new MockResponse(new MockRequest());

beforeEach(() => res.reset());

test('allows setting and reading the HTTP status', () => {
   res.status(HttpStatus.NotFound);
   expect(res.httpStatus).toBe(HttpStatus.NotFound);
});

test('accepts headers', () => {
   res.setHeader(Header.CacheControl, 'no-cache');
   res.setHeader(Header.Expires, 'Tue, 01 Jan 1980 1:00:00 GMT');
   res.setHeader(Header.PRAGMA, 'no-cache');

   expect(res.headers).toHaveKeyValue(Header.PRAGMA, 'no-cache');

   res.set({
      'Fake-Header1': 'header-value1',
      'Fake-Header2': 'header-value2'
   });

   expect(res.headers).toHaveKeyValue('Fake-Header1', 'header-value1');
   expect(res.headers).toHaveKeyValue('Fake-Header2', 'header-value2');
});

test('has setter/getter for headers', () => {
   res.header('Fake-Header1', 'header-value1');
   expect(res.header('Fake-Header1')).toBe('header-value1');
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

test('simulates template rendering', () => {
   res.render('template', { key1: 'value1', key2: 'value2' });

   expect(res.rendered).toHaveProperty('template', 'template');
   expect(res.rendered).toHaveProperty('context');
   expect(res.rendered.context).toHaveProperty('key1', 'value1');
   expect(res.rendered.context).toHaveProperty('key2', 'value2');
});

test('tracks whether response is ended', () => {
   res.onEnd = jest.fn();
   res.end();
   expect(res.onEnd).toHaveBeenCalledTimes(1);
});

test('can be reset and re-used', () => {
   res.reset();
   expect(res.ended).toBe(false);
   expect(res.httpStatus).toBe(HttpStatus.OK);
});
