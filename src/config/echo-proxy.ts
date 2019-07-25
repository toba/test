export default new Proxy<{ [key: string]: string }>(
   {},
   {
      get: (_target, key): string | boolean =>
         key === '__esModule' ? false : key.toString()
   }
);
