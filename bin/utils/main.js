module.exports = async function() {
  const yargs = require("yargs");
  const checks = require("./checks");
  const processDir = require("./process");
  const path = require("path");
  const getBaseName = require("./getBaseName");
  const options = yargs
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
      default: `./bin/utils/base.Dockerfile`
    }).argv;

  // convert all paths to absolute paths
  Object.keys(options).forEach(p => {
    if (
      !(p === "dockerUser" || p === "docker-user") &&
      typeof options[p] === "string"
    ) {
      options[p] = path.resolve(options[p]);
    }
  });
  checks(options);
  await processDir(options);
};
