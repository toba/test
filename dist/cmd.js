"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mocha = require("mocha");
var fs = require("fs");
var path = require("path");
require("ts-node/register");
require("tsconfig-paths/register");
require("ignore-styles");
var mocha = new Mocha();
var testDir = "./src/";
fs
    .readdirSync(testDir)
    .filter(function (file) { return file.substr(-7) === "test.ts"; })
    .forEach(function (file) {
    mocha.addFile(path.join(testDir, file));
});
mocha.run(function (failures) {
    process.on("exit", function () {
        process.exit(failures);
    });
});
