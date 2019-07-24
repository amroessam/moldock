module.exports = function(options) {
  const path = require("path");
  Object.keys(options).forEach(p => {
    if (
      !(p === "dockerUser" || p === "docker-user") &&
      typeof options[p] === "string"
    ) {
      options[p] = path.resolve(options[p]);
    }
  });
  return options;
};
