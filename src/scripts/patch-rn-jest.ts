import * as fs from 'fs';
import * as path from 'path';
// imported only so that tsc will "compile" to target
import './mockComponent.replacement';

/*
The React Native Jest Setup requires mockComponent.js which declares a class
with a static field initialization

   const Component = class extends SuperClass {
      static displayName = 'Component';
      ...

which is not valid JavaScript for the node runtime that executes Jest. The fix
is simply to remove that "static ..." line and add below

   Component.displayName = 'Component';
*/

const fileName = 'mockComponent';
const toModules = __dirname.includes('node_modules')
   ? ['..', '..', '..']
   : ['..', 'node_modules'];

const source = path.join(__dirname, `${fileName}.replacement.js`);
const target = path.join(
   __dirname,
   ...toModules,
   'react-native',
   'jest',
   `${fileName}.js`
);

if (fs.existsSync(target)) {
   console.log('Found React Native Jest Configuration');
   if (fs.existsSync(source)) {
      fs.copyFileSync(source, target);
      console.log(`Replaced ${fileName}.js`);
   }
} else {
   console.warn(`${target} does not exist`);
}
