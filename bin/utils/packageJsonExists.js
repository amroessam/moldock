module.exports = function(dir) {
  const fs = require("fs");
  const dirList = fs.readdirSync(dir);
  if (
    dirList.some(
      i =>
        i.toLowerCase() === "package.json" &&
        fs.lstatSync(`${dir}/${i}`).isFile()
    )
  )
    return true;
};
