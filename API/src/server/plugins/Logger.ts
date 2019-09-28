import * as Hapi from '@hapi/hapi';
// @ts-ignore no types for hapi/good
import * as Good from '@hapi/good';
import IPlugin from './interface/IPlugin';

class Logger implements IPlugin {

  async register(server: Hapi.Server): Promise<void> {

    if (process.env.NODE_ENV !== 'test') {
      await server.register({
        plugin: Good,
        options: {
          reporters: {
            console: [
              {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{
                  response: { exclude: 'Utils' },
                  log: '*',
                  error: '*'
                }]
              },
              {
                module: '@hapi/good-console'
              },
              'stdout'
            ]
          }
        }
      });
    }
  }

}

export default new Logger();
