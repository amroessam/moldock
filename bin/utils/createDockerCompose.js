module.exports = function(project, service, dockerUser) {
  const spawn = require("child_process").spawn;
  const proc = spawn("cmd.exe ");
  proc.stdout.on("data", function(data) {
    process.stdout.write(data);
  });
  return `version: "3.0"
  services:
    ${service}:
      image: ${dockerUser}/${project}-${service}:latest
      env_file: docker-compose.env
      environment:
        SERVICES: ${service}
  `;
};
