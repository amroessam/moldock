module.exports = function(dir) {
  const path = require("path");
  return path.basename(path.resolve(dir));
};
