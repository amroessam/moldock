module.exports = async function(args) {
  return new Promise(async (resolve, reject) => {
    const fs = require("fs");
    const clear = require("clear");
    const readPackage = require("./readPackage");
    const readServices = require("./readServices");
    const getBaseName = require("./getBaseName");
    const createDockerCompose = require("./createDockerCompose");
    const createDirIfDoesntExit = require("./createDirIfDoesntExit");
    const copyEverythingElse = require("./copyEverythingElse");
    const { p: dir, s: servicesDir, o: output, dockerFile, dockerUser } = args;
    const pkg = readPackage(dir);
    const services = readServices(servicesDir).map(s => s.split(".")[0]);
    const { prompt } = require("enquirer");
    const questions = services.map(service => {
      return {
        type: "multiselect",
        name: service,
        message: `Which packages would you like to include for ${service}?`,
        choices: [...Object.keys(pkg.dependencies)],
        initial: ["moleculer"]
      };
    });
    const depChoice = await prompt(questions);
    createDirIfDoesntExit(output);
    services.forEach(service => {
      const serviceOutput = createDirIfDoesntExit(
        `${output}/${getBaseName(dir)}-${service}`
      );
      createDirIfDoesntExit(`${serviceOutput}/services`);
      const serviceFile = fs.readFileSync(
        `${dir}/services/${service}.service.js`
      );
      const baseDockerfile = fs.readFileSync(dockerFile);

      const dockerCompose = createDockerCompose(
        getBaseName(dir),
        service,
        dockerUser
      );
      const servicePkg = { dependencies: {} };
      depChoice[service].forEach(
        dep => (servicePkg.dependencies[dep] = pkg.dependencies[dep])
      );
      servicePkg.name = `${pkg.name}-${service}`;
      fs.writeFileSync(
        `${serviceOutput}/package.json`,
        JSON.stringify(servicePkg, null, 2)
      );
      fs.writeFileSync(`${serviceOutput}/Dockerfile`, baseDockerfile);
      fs.writeFileSync(`${serviceOutput}/docker-compose.env`, "");
      fs.writeFileSync(`${serviceOutput}/docker-compose.yml`, dockerCompose);
      fs.writeFileSync(
        `${serviceOutput}/services/${service}.service.js`,
        serviceFile
      );
      copyEverythingElse(dir, `${serviceOutput}`);
      console.log(`${service} created successfully!`);
    });
    clear();
    resolve(console.log("Done!"));
  });
};
