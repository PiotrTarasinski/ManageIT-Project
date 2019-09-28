import { env } from '../../config';
import { Lifecycle, Server, ServerRequestExtType } from '@hapi/hapi';

class HapiServer extends Server {
  constructor() {
    super({
      routes: {
        cors: {
          origin: ['*'],
          exposedHeaders: ['access_token']
        },
        state: {
          parse: false,
          failAction: 'ignore'
        }
      },
      host: env.SERVER_HOST_NAME,
      port: <number>env.PORT
    });


    const hooks: { type: ServerRequestExtType, method: Lifecycle.Method; }[] = [];

    hooks.forEach((hook) => {
      this.ext(hook.type, hook.method);
    });
  }
}

export default HapiServer;
