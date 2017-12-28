/* tslint:disable:no-unused */
import * as Mocha from "mocha";
import * as fs from "fs";
import * as path from "path";
import "ts-node/register";
import "tsconfig-paths/register";
import "ignore-styles";

// node_modules/.bin/mocha
// --require ts-node/register
// --require ignore-styles
// --require tsconfig-paths/register
// ./**/*.test.ts*"

const mocha = new Mocha();
const testDir = "src";

// https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
fs
   .readdirSync(testDir)
   .filter(file => file.substr(-3) === ".ts")
   .forEach(file => {
      mocha.addFile(path.join(testDir, file));
   });

mocha.run(failures => {
   process.on("exit", () => {
      process.exit(failures);
   });
});
