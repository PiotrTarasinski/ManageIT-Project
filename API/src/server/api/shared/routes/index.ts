import { Server } from '@hapi/hapi';
import MainRoutes from './MainRoutes';

import mainRoutes from './sections/mainRoutes';

async function registerRoutes(server: Server): Promise<void[]> {
  const routesToRegister: MainRoutes[] = [
    ...mainRoutes
  ];

  return await Promise.all(
    routesToRegister.map(routes => routes.register(server))
  );
}

export default registerRoutes;
