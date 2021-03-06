import { env } from '../../config';
import { Lifecycle, Server, ServerRequestExtType } from '@hapi/hapi';
import ApiError from '../api/error/ApiError';
import httpStatus = require('http-status');
import { join } from 'path';

class HapiServer extends Server {
  constructor() {
    super({
      routes: {
        files: {
          relativeTo: join(__dirname, '../../public')
        },
        cors: {
          origin: ['*'],
          exposedHeaders: ['access_token']
        },
        state: {
          parse: false,
          failAction: 'ignore'
        },
        validate: {
          failAction: async (req, h, err) => {
            console.log(typeof err);
            if (env.NODE_ENV === 'development' && err) {
              console.log(join(__dirname, '../../public'));
              throw err;
              // throw ApiError.boom(null, { message: err.message, statusCode: httpStatus.BAD_REQUEST });
            }
            throw ApiError.boom(null, { message: 'Invalid request payload.', statusCode: httpStatus.BAD_REQUEST });
          }
        }
      },
      host: env.SERVER_HOST_NAME,
      port: <number>env.PORT
    });

    const hooks: { type: ServerRequestExtType; method: Lifecycle.Method }[] = [];

    hooks.forEach(hook => {
      this.ext(hook.type, hook.method);
    });
  }
}

export default HapiServer;
