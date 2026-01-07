import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';

import { ConfigImpl } from './application/config';
import router from './presentation/router';
import { BaseError } from './domain/errors/baseError';
import { HttpStatus } from './domain/enum/http-status.enum';

(async function main() {
  const app = fastify({ logger: false });
  const config = new ConfigImpl();

  app.register(swagger, {
    swagger: {
      info: {
        title: config.app.name,
        version: config.app.version,
      },
    },
  });

  app.register(swaggerUi, { routePrefix: `/docs` });

  app.register(cors, { origin: (_, cb) => cb(null, true) });

  app.register(router);

  app.setErrorHandler(function (error: BaseError, request, reply) {
    console.error(error);
    if (error.statusCode) {
      return reply.status(error.statusCode).send(error);
    }

    return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  });


  app.listen({ port: config.app.port, host: config.app.host }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`Server listening at ${address}`);
  });
})()