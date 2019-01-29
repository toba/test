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
            targets: {
               node: 'current'
            }
         }
      ],
      '@babel/preset-typescript'
   ]
};
