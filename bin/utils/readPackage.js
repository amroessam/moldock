module.exports = function(dir) {
  const fs = require("fs");
  return JSON.parse(fs.readFileSync(`${dir}/package.json`));
};
