module.exports = function(dir, output) {
  const fs = require('fs')
  const ncp = require('ncp')
  const dirList = fs.readdirSync(dir)
  // fs.lstatSync(`${dir}/${i}`).isDirectory()
  dirList.forEach(f=>{
    if()
  })
  ncp.filter = /node_modules|.vscode|package-lock.json/
  ncp(dir,output, function(err){
    if(err){
      console.log(err)
      process.exit()
    }
  })
};
