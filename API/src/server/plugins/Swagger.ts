import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Vision from '@hapi/vision';
import * as Inert from '@hapi/inert';
import IPlugin from './interface/IPlugin';
import { app } from '../../config';
import { logger } from '../../utils';


class Swagger implements IPlugin {

  async register(server: Hapi.Server): Promise<void> {

    try {
      await server.register(Inert);
      await server.register(Vision);

      const options: HapiSwagger.RegisterOptions = {
        info: {
          title: 'NotesHub Documentation',
          version: app.version
        },
        basePath: '/api/v1',
        grouping: 'tags',
        schemes: ['https', 'http'],
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        },
        security: [{ Bearer: [] }]
      };

      await server.register({
        plugin: HapiSwagger,
        options
      });

    } catch (e) {
      logger.info('Error loading swagger docs!', e);
    }
  }

}

export default new Swagger();
