module.exports = function(dir, servicesDir) {
  const fs = require('fs')
  const dirList = fs.readdirSync(dir)
  if (
    dirList.some(
      i =>
        i.toLowerCase() === servicesDir &&
        fs.lstatSync(`${dir}/${i}`).isDirectory()
    )
  )
    return true;
};
