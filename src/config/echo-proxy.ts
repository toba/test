export default new Proxy(
   {},
   {
      get: (_target, key) => (key === '__esModule' ? false : key)
   }
);
