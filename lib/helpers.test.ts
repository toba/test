import '../index';

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
   expect(s).toHaveValues('one', 'two', 'three');
   expect(s).not.toHaveValues('one', 'two', 'four');
});

test('adds map equality expectation', () => {
   const s = new Map<number, string>([[1, 'one'], [2, 'two'], [3, 'three']]);
   expect(s).toHaveValues('one', 'two', 'three');
   expect(s).not.toHaveValues('one', 'two', 'four');
});

test('adds map key expectation', () => {
   const s = new Map<number, string>([[1, 'one'], [2, 'two'], [3, 'three']]);
   expect(s).toHaveKeys(1, 2, 3);
   expect(s).not.toHaveKeys(1, 2, 4);
});

test('adds lat/lng point expectation', () => {
   expect([120, -35]).toBeLatLng();
   expect([200, 100]).not.toBeLatLng();
});
