module.exports = function(dir) {
  const fs = require('fs')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir
};
