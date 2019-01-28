/**
 * @see https://github.com/facebook/jest/issues/6229
 */
module.exports = {
   plugins: ['@babel/plugin-proposal-class-properties'],
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
