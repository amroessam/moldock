module.exports = function(servicesDir) {
  const fs = require("fs");
  return fs.readdirSync(servicesDir);
};
