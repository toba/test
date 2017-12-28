/* tslint:disable:no-unused */
import * as Mocha from "mocha";
import * as fs from "fs";
import * as path from "path";
import * as tsnode from "ts-node";
//import "tsconfig-paths/register";
import "ignore-styles";

// node_modules/.bin/mocha
// --require ts-node/register
// --require ignore-styles
// --require tsconfig-paths/register
// ./**/*.test.ts*"

const mocha = new Mocha();
const testDir = "src";
const reg = tsnode.register({
   cacheDirectory: "./dist"
});

// https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
fs
   .readdirSync(reg.cachedir)
   //.filter(file => file.substr(-7) === "test.ts")
   .forEach(file => {
      mocha.addFile(path.join(reg.cachedir, file));
   });

mocha.run(failures => {
   process.on("exit", () => {
      process.exit(failures);
   });
});
