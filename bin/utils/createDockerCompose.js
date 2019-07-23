module.exports = function(project, service, dockerUser) {
  return `version: "3.0"
  services:
    ${service}:
      image: ${dockerUser}/${project}-${service}:latest
      env_file: docker-compose.env
      environment:
        SERVICES: ${service}
  `;
};
