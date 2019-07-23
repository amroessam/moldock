#!/usr/bin/env node
const yargs = require("yargs");
const checks = require('./utils/checks')
const options = yargs
  .usage("Usage: -p <Project Path>")
  .option("p", {
    alias: "path",
    describe: "Path of the projcet to dockerize",
    type: "string",
    default: "."
  })
  .option("s", {
    alias: "services",
    describe: "Name of services folder",
    type: "string",
    default: "services"
  }).argv;

checks(options)

console.log('All ok, resuming...');
