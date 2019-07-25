export default new Proxy<{}>(
   {},
   {
      get: (_target, key): string | boolean =>
         key === '__esModule' ? false : key.toString()
   }
);
