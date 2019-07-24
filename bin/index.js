#!/usr/bin/env node
(async function() {
  require("./utils/handleExit")();
  try {
    const yargs = require("yargs");
    const checks = require("./utils/checks");
    const processDir = require("./utils/process");

    const getBaseName = require("./utils/getBaseName");
    const converToAbsPath = require("./utils/convertToAbsPath");
    const options = converToAbsPath(
      yargs
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
        })
        .option("o", {
          alias: "output",
          describe: "Output directory of project",
          type: "string",
          default: `../${getBaseName(process.cwd())}-moldock/`
        })
        .option("dockerUser", {
          describe: "Docker username for Dockerfile image property",
          type: "string",
          demandOption: true
        })
        .option("dockerFile", {
          describe: "Path to base Dockerfile to add",
          type: "string",
          default: function() {
            return process.platform === "win32"
              ? `${__dirname}\\utils\\base.Dockerfile`
              : `${__dirname}/utils/base.Dockerfile`;
          }
        }).argv
    );
    checks(options);
    await processDir(options);
    process.exit();
  } catch (error) {
    console.log(error);
  }
})();
