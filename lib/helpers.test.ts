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

test('adds lat/lng point expectation', () => {
   expect([120, -35]).toBeLatLng();
   expect([200, 100]).not.toBeLatLng();
});
