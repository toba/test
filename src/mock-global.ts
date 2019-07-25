import { ValueType } from '@toba/tools';

/**
 * Add method to global scope.
 * @param name Name of method to bind
 * @param fn Method
 */
export function bindGlobal(name: string, fn: Function) {
   const g: any = getGlobal();
   g[name] = fn.bind(g);
}

function getGlobal(): Window | NodeJS.Global {
   if (typeof self !== ValueType.Undefined) {
      return self;
   }
   if (typeof window !== ValueType.Undefined) {
      return window;
   }
   if (typeof global !== ValueType.Undefined) {
      return global;
   }
   throw new Error('Unable to identify global object');
}
