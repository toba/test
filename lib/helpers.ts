export function expectWithin(target: number, min: number, max: number) {
   expect(target).toBeLessThanOrEqual(max);
   expect(target).toBeGreaterThanOrEqual(min);
}

export function expectAllProperties(target: Object, ...keys: string[]) {
   keys.forEach(k => {
      expect(target).toHaveProperty(k);
   });
}
