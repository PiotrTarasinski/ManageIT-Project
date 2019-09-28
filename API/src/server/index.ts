import HapiServer from './hapi/HapiServer';
import db from './database';
import { logger } from '../utils';
import registerPlugins from './plugins';
import registerRoutes from './api/shared/routes';
// Create server instance
const server = new HapiServer();

// Run initialization events chain
async function init() {
  logger.info('Starting server...');

  try {
    logger.info('Registering plugins...');
    await registerPlugins(server);
    logger.info('Plugins registered!');

    logger.info('Registering routes...');
    await registerRoutes(server);
    logger.info('MainRoutes registered!');

    logger.info('Starting server...');
    await server.start();
    logger.info('Server started!');

    logger.info('Synchronizing database...');
    await db.sequelize.sync();
    logger.info('Database synchronized!');
    logger.info('-=-=-=-=- All done, good to go! -=-=-=-=-=-');

  } catch (err) {
    logger.error('Initialization error.', err.message);
  }
}

if (process.env.NODE_ENV !== 'test') {
  init();
}

export {
  init
};

export default server;
