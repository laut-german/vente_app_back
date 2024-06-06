# app_events_back_v2

![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.16.0-brightgreen)
![npm Version](https://img.shields.io/badge/npm-%3E%3D6.0.0-blue)
![License: GPL v3.0](https://img.shields.io/badge/license-GPL%20v3.0-red)

## Description
Backend for an event management and attendance application. This application is a Work In Progress (WIP).

## Requirements

- Node.js: >= 18.16.0
- npm: >= 6.0.0 (usually installed with Node.js)

## Installation

To install the project dependencies, run the following command:
```bash
npm install
```

## Running the application

To run the application locally, you can use the following commands:
```bash
npm run start
```
### Development Mode

This command will start the application in development mode, with automatic reload on changes:

```bash
npm run start:dev
```

### Production Mode

This command will build the project and then start the application in production mode:
```bash
npm run build
npm run start:prod
```

## Project Structure
```
.
├── src
│   ├── core
│   │   ├── meetup
│   │   │   └── infrastructure
│   │   │       └── http
│   │   └── user-account
│   │       ├── application
│   │       │   ├── commands
│   │       │   ├── queries
│   │       │   └── responses
│   │       ├── domain
│   │       │   ├── entities
│   │       │   ├── enums
│   │       │   ├── errors
│   │       │   └── storage
│   │       └── infrastructure
│   │           ├── http
│   │           │   └── common-dtos
│   │           └── store
│   │               ├── repositories
│   │               └── schemas
│   ├── emails
│   ├── shared
│   │   ├── domain
│   │   └── infrastructure
│   └── utils
└── test
``````


## Author

This project is being developed by laut_german.

## License

This project is under GPL v3.0.
