# RS Solutions

Backend API developed with Node.js and TypeScript on Fastify, organized into well-defined layers (`application`, `domain`, `infrastructure`, and `presentation`) and aligned with Clean Architecture best practices to ensure maintainability and scalability.

## Description

-   The project provides CRUD operations for users.
-   Uses MongoDB as the main database and Redis as an optional cache.

## Requirements

-   [Node.js](https://nodejs.org/) (recommended version: \>= 24.11.0)
-   [MongoDB](https://www.mongodb.com/)
-   [Redis](https://redis.io/)
-   [Docker](https://www.docker.com/)

## Installation

``` bash
npm install
```

## Environment variables

The `.env` file is located at the root of the project.

``` env
# App
PORT=3000
HOST=0.0.0.0

# Redis (optional)
REDIS_ENABLED=false
REDIS_PORT=6379
REDIS_HOST=127.0.0.1
REDIS_DEFAULT_EXPIRE=3600

# MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=rs_solutions
```

## Running with Docker

You can run the application using Docker Compose. The project includes a
`docker-compose.yml` file at the root --- adjust the environment
variables directly in this file.

Quick example (from the project root):

``` bash
docker compose up --build
```

This will build the image and start the services defined in
`docker-compose.yml`.

To run in the background:

``` bash
docker compose up -d --build
```

To stop and remove containers:

``` bash
docker compose down
```

## Useful scripts

-   `npm run start` --- runs the app in development mode using `tsx`
    (executes `src/index.ts`).
-   `npm run build` --- transpiles TypeScript to `dist` and applies path
    aliases using `tsc-alias`.
-   `npm run start:prod` --- runs `node dist/index.js` (used in
    production after `build`).

## Build

1.  Adjust the variables in `docker-compose.yml`.
2.  Generate the build:

``` bash
npm run build
```

3.  Start the application:

``` bash
npm run start:prod
```

## Without build

-   To run the project directly from `.ts` files:

``` bash
npm start
```

## Swagger

-   Swagger will be available at `http://127.0.0.1:4000/rs-solutions/docs`
    (check the port in the `.env` file or `docker-compose.yml`).

## Unit tests

-   To run unit tests:

``` bash
npm test
```
