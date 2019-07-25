export const config = {
   plugins: [
      '@babel/plugin-proposal-class-properties',
      // needed to allow dynamic import() syntax
      '@babel/plugin-syntax-dynamic-import',
      // needed to mock dynamic imports for Node (Jest) execution
      'dynamic-import-node'
   ],
   presets: [
      [
         '@babel/preset-env',
         {
            useBuiltIns: 'usage',
            // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpreset-env
            corejs: 3.1,
            targets: { node: 'current' }
         }
      ]
   ]
};
