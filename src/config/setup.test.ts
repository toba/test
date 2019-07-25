import '../';

test('indexedDB should be defined by mock', () => {
   expect(indexedDB).toBeDefined();
   expect(IDBKeyRange).toBeDefined();
});

test('storage should be defined by the mock', () => {
   expect(sessionStorage).toBeDefined();
   expect(localStorage).toBeDefined();
});

test('current date should always return March 15, 2018', () => {
   const d = new Date();
   expect(d.getFullYear()).toBe(2018);
   expect(d.getMonth()).toBe(2);
   expect(d.getDate()).toBe(15);
});
