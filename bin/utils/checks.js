module.exports = function(args) {
  const servicesDirExists = require("./servicesDirExists");
  const packageJsonExists = require("./packageJsonExists");
  const { p: dir, s: servicesDir, o: output } = args;
  if (!packageJsonExists(dir)) {
    console.log(
      `package.json wasn't found. You're sure this is a node project?`
    );
    process.exit();
  }
  if (!servicesDirExists(dir, servicesDir)) {
    console.log(
      `${path.basename(
        path.resolve(servicesDir)
      )} folder wasn't found. You're sure this is a moleculer project?`
    );
    process.exit();
  }
};
