module.exports = function(dir, output) {
  const ignore = require("./ignore");
  const fs = require("fs");
  const ncp = require("ncp");
  const dirList = fs.readdirSync(dir);
  const copydir = require("copy-dir");
  dirList.forEach(f => {
    const inDir = process.platform === "win32" ? `${dir}\\${f}` : `${dir}/${f}`;
    const outDir =
      process.platform === "win32" ? `${output}\\${f}` : `${output}/${f}`;
    if (
      fs.lstatSync(inDir).isDirectory() &&
      !ignore.folders.some(folder => f === folder)
    ) {
      copydir.sync(inDir, outDir, {});
    }
    if (fs.lstatSync(inDir).isFile() && !ignore.files.some(file => f === file))
      ncp(inDir, outDir);
  });
};
