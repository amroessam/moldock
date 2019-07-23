module.exports = function(dir, servicesDir) {
  const fs = require("fs");
  const path = require("path");
  const dirList = fs.readdirSync(dir);
  if (
    dirList.some(
      i =>
        i.toLowerCase() === path.basename(path.resolve(servicesDir)) &&
        fs.lstatSync(`${dir}/${i}`).isDirectory()
    )
  )
    return true;
};
