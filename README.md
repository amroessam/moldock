![Moleculer logo](https://raw.githubusercontent.com/moleculerjs/moleculer/HEAD/docs/assets/logo.png)
# moldock (Moleculer Dockerized)

## A CLI tool to deconstruct [moleculer](https://github.com/moleculerjs/moleculer) projects into their own dependant projects, to be able to dockerize them individually

# ☠ The Problem

Moleculer structures all it's services in a `services` folder as follows:

```tree
Project
├───services
│     ├───api.service.js
│     ├───greeter.service.js
│     └───otherService.service.js
├───etc
```

When you try to dockerize the services, it creates an image with all the dependencies of all the services and copies all the services in that image. So if you want the API service to be in it's individual container, everything for all the other services will be copied. Also you will have to create an individual `docker-compose.yml`

That causes a lot of manual work and a bloated docker image.
You can check out the moleculer conduit repo as an example structure [here](https://github.com/moleculerjs/moleculer-examples/tree/master/conduit)

# 🎉The Solution

moldock:

moleculer-dockerized or [`moldock`](https://www.npmjs.com/package/moldock) for short takes the project and asks you what packages are needed for each service.
It then creates a folder with all the services as their own projects with their corrosponding `package.json`, `Dockerfile`, `docker-compose.yml`, `docker-compose.env`

It creates a new directory one level up from where the project is and appends `-moldock` to the directory.
This directory will contain all the destructured services in their respective folders. Each service folder will be a combination of the name of the project and the name of the service like so `project-service`

```tree
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

You can check out the exported conduit example in the `example` folder.

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
4. Your services are in a `services` folder named `<service name>.service.js`

# 🔻Installation

`npm i -g moldock`

# 🖥Usage

1. Change directory to the moleculer project
2. Run `moldock --dockerUser <your docker user>`
3. Select the dependecies of each service
4. Profit

# 🛣Roadmap

- [ ] Auto infer required modules and select them by default
- [ ] Add a flag to auto build docker image
- [ ] Add a flag to auto push docker image
- [ ] Remove `--dockUser` and auto capture it from system
- [ ] Add an option for main folder append string
- [ ] Use chalk and boxed to make it look pretty
