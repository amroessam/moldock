module.exports = async function(args) {
  const fs = require("fs");
  const path = require("path");
  const readPackage = require("./readPackage");
  const readServices = require("./readServices");
  const getBaseName = require("./getBaseName");
  const createDockerCompose = require("./createDockerCompose");
  const createDirIfDoesntExit = require("./createDirIfDoesntExit");
  const copyEverythingElse = require("./copyEverythingElse");
  const { p: dir, s: servicesDir, o: output, dockerFile, dockerUser } = args;
  const pkg = readPackage(dir);
  const services = readServices(servicesDir).map(s => s.split(".")[0]);
  const Prompt = require("prompt-checkbox");
  services.forEach(async service => {
    const serviceOutput = createDirIfDoesntExit(
      `${output}/${getBaseName(dir)}-${service}`
    );
    createDirIfDoesntExit(
      `${serviceOutput}/services`
    );
    const serviceFile = fs.readFileSync(`${dir}/services/${service}.service.js`)
    const baseDockerfile = fs.readFileSync(dockerFile)
    const dockerCompose = createDockerCompose(getBaseName(dir), service, dockerUser)
    const depPrompt = new Prompt({
      name: "dependencies",
      message: `Which dependencies would you like to include for ${service}?`,
      radio: true,
      choices: {
        dependencies: [...Object.keys(pkg.dependencies)]
      }
    });
    await depPrompt.ask(deps => {
      const servicePkg = {};
      servicePkg.dependencies = {};
      deps.forEach(
        dep => (servicePkg.dependencies[dep] = pkg.dependencies[dep])
      );
      servicePkg.name = `${pkg.name}-${service}`;
      fs.writeFileSync(
        `${serviceOutput}/package.json`,
        JSON.stringify(servicePkg, null, 2)
      );
      fs.writeFileSync(`${serviceOutput}/Dockerfile`, baseDockerfile)
      fs.writeFileSync(`${serviceOutput}/docker-compose.env`)
      fs.writeFileSync(`${serviceOutput}/docker-compose.yml`, dockerCompose)
      fs.writeFileSync(`${serviceOutput}/services/${service}.service.js`, serviceFile)
      copyEverythingElse(dir,`${serviceOutput}`)
    });
  });
};
