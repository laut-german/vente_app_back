# app_events_back_v2

![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.16.0-brightgreen)
![npm Version](https://img.shields.io/badge/npm-%3E%3D9.8.0-blue)
![License: GPL v3.0](https://img.shields.io/badge/license-GPL%20v3.0-red)

## Work In Progress (WIP)

⚠️ **This project is currently a Work In Progress (WIP). Features may be incomplete and changes may occur frequently.** ⚠️

### Environment Variables

For security reasons, the `.env` file is not included in the repository. If you need the `.env` file to run the application, please contact me via email at [laut.german@gmail.com](mailto:laut.german@gmail.com).

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

### Dockerized Mode

To run the application using Docker, follow these steps:

1. **Build and Run the Docker Container:**

   Use the provided `local-deploy.sh` script to build the Docker image and run the container:
   ```bash
   ./local-deploy.sh
   ```
2. **Stop and Remove the Docker Container and Image:**

   Use the `clean-up.sh` script to stop and remove the Docker container and image:
   ```bash
   ./clean-up.sh
   ```
3. **Restarting the Container:**

   If you need to stop the container and resume later without rebuilding, you can use the following commands:

   - **Stop the container:**
     ```bash
     docker stop container_id_or_name
     ```

   - **Start the container:**
     ```bash
     docker start container_id_or_name
     ```



## Author

This project is being developed by laut_german.

## License

This project is under GPL v3.0.
