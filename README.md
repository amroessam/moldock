![Moleculer logo](https://github.com/moleculerjs/moleculer/blob/master/docs/assets/logo.png)
# moleculer-dockerized

## A CLI tool to deconstruct moleculer projects into their own dependant projects, to be able to dockerize them individually

### The Problem 
Moleculer structures all it's services in a `services` folder as follows:
```
Project
├───services
│     ├───api.service.js
│     ├───greeter.service.js
│     └───otherService.service.js
├───etc
```

When you try to dockerize the services, it creates an image with all the dependencies of all the services and copies all the services in that image. So if you want the API service to be in it's individual container, everything for all the other services will be copied. Also you will have to create an individual `docker-compose.yml`

That causes a lot of manual work and a bloated docker image


### The Solution
    moleculer-dockerized
moleculer-dockerized or `moldock` for short takes the project and asks you what packages are needed for each service.
It then creates a folder with all the services as their own projects with their corrosponding 