const servicesDirExists = require("./servicesDirExists");
const packageJsonExists = require("./packageJsonExists");
module.exports = function(args) {
  const { p: dir, s: servicesDir } = args;
  if (!packageJsonExists(dir)) {
    console.log(
      `package.json wasn't found. You're sure this is a node project?`
    );
    process.exit();
  }
  if (!servicesDirExists(dir, servicesDir)) {
    console.log(
      `${
        servicesDir
      } folder wasn't found. You're sure this is a moleculer project?`
    );
    process.exit();
  }
};
