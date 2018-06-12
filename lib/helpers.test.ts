import './index';
import { MockResponse } from './index';

test('adds within expectation', () => {
   expect(3).toBeWithin(2, 5);
   expect(7).not.toBeWithin(2, 5);
});

test('adds all properties expectation', () => {
   const thing = {
      one: 1,
      two: 2,
      three: 3
   };

   expect(thing).toHaveAllProperties('one', 'two', 'three');
   expect(thing).not.toHaveAllProperties('four', 'five');
});

test('adds set equality expectation', () => {
   const s = new Set<string>(['one', 'two', 'three']);
   expect(s).toHaveValues('one', 'three');
   expect(s).toHaveValues('one', 'two', 'three');
   expect(s).not.toHaveValues('one', 'two', 'four');
});

test('adds map equality expectation', () => {
   const s = new Map<number, string>([[1, 'one'], [2, 'two'], [3, 'three']]);
   expect(s).toHaveValues('two', 'three');
   expect(s).toHaveValues('one', 'two', 'three');
   expect(s).not.toHaveValues('one', 'two', 'four');
});

test('adds map key expectation', () => {
   const s = new Map<number, string>([[1, 'one'], [2, 'two'], [3, 'three']]);
   expect(s).toHaveKeys(1, 2);
   expect(s).toHaveKeys(1, 2, 3);
   expect(s).not.toHaveKeys(1, 2, 4);
});

test('adds map key-value expectation', () => {
   const s = new Map<number, string>([[1, 'one'], [2, 'two'], [3, 'three']]);
   expect(s).toHaveKeyValue(1, 'one');
   expect(s).toHaveKeyValue(2, 'two');
   expect(s).not.toHaveKeyValue(1, 'three');
});

test('adds lat/lng point expectation', () => {
   expect([120, -35]).toBeLatLng();
   expect([200, 100]).not.toBeLatLng();
});

test('adds response render template expectation', done => {
   const res = new MockResponse();
   res.onEnd = () => {
      expect(res).toRenderTemplate('template');
      done();
   };
   res.render('template');
});

test('adds response redirect expectation', done => {
   const res = new MockResponse();
   res.onEnd = () => {
      expect(res).toRedirectTo('./some-url');
      done();
   };
   res.redirect('./some-url');
});
