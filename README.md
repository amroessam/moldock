![Moleculer logo](https://raw.githubusercontent.com/moleculerjs/moleculer/HEAD/docs/assets/logo.png)
# moldock (Moleculer Dockerized)

## A CLI tool to deconstruct [moleculer](https://github.com/moleculerjs/moleculer) projects into their own dependant projects, to be able to dockerize them individually

# ☠ The Problem 

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


# 🎉The Solution

moleculer-dockerized:

moleculer-dockerized or [`moldock`](https://www.npmjs.com/package/moldock) for short takes the project and asks you what packages are needed for each service.
It then creates a folder with all the services as their own projects with their corrosponding `package.json`, `Dockerfile`, `docker-compose.yml`, `docker-compose.env`

```
Project-moldock
├───Project-api
│     ├───services
│     │      └───api.service.js
│     ├───Dockerfile
│     ├───docker-compose.yml
│     ├───docker-compose.env
│     ├───package.json
│     └───etc
├───Project-greeter
│     ├───services
│     │      └───greeter.service.js
│     ├───Dockerfile
│     ├───docker-compose.yml
│     ├───docker-compose.env
│     ├───package.json
│     └───etc
├───Project-otherService
│     ├───services
│     │      └───otherService.service.js
│     ├───Dockerfile
│     ├───docker-compose.yml
│     ├───docker-compose.env
│     ├───package.json
│     └───etc
├───etc
```

# 🤷‍♂️Assumptions

1. You don't want to copy these folders:
    * node_modules
    * test
    * tests
    * .vscode
    * data
    * db
    * .git

2. You have a docker hub account
3. You want to copy everything in the project to each service


# 🔻Installation

`npm i -g moldock`


# 🖥Usage

1. Change directory to the moleculer project
2. Run `moldock --dockerUser <your docker user>`
3. Select the dependecies of each service
4. Profit


# 🙌Output

It creates a new directory one level up from where the project is and appends `-moldock` to the directory.
This directory will contain all the destructured services in their respective folders. Each service folder will be a combination of the name of the project and the name of the service like so `project-service`
