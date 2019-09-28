import Hapi from '@hapi/hapi';
import { RouteConfig } from '../../../../typings/Hapi';

interface Routes {
  path: string;

  uri(partial: string): string;

  register(server: Hapi.Server): Promise<void>;

  getRoutes?(): RouteConfig[];

  getPrefix(): string;
}

abstract class Routes implements Routes {

  path: string = '';

  uri(partial: string): string {
    const lastPart = partial === '/' ? '' : partial;

    return `${this.getPrefix()}${this.path}${lastPart}`;
  }

  async register(server: Hapi.Server) {

    const routes = this.getRoutes ? this.getRoutes() : [];

    for (const route of routes) {
      await server.route({
        ...route,
        path: this.uri(route.path)
      });
    }
  }
}

export default Routes;
