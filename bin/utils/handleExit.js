module.exports = function() {
  if (process.platform === "win32") {
    const clear = require("clear");
    const rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on("SIGINT", function() {
      process.emit("SIGINT");
    });
    process.on("SIGINT", function() {
      clear();
      console.log("Bye bye!");
      process.exit();
    });
  }
};
