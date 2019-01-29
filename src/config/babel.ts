export const config = {
   plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import'
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
