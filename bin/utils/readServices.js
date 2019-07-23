module.exports = function(servicesDir) {
  const fs = require("fs");
  console.log(servicesDir)
  return fs.readdirSync(servicesDir);
};
