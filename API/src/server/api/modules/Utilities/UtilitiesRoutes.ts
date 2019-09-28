import { documentation } from '../../../../utils';
import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import UtilitiesController from './UtilitiesController';


class UtilitiesRoutes extends MainRoutes {
  path: string = '/utilities';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'GET',
        path: '/version',
        options: {
          handler: (req, res) => new UtilitiesController(req, res).getVersion(),
          description: 'Gets application version',
          notes: 'Gets application version',
          tags: documentation('public', 'Utilities'),
          validate: {
            query: {}
          },
          plugins: {},
          auth: false
        }
      }
    ];
  }

}

export default new UtilitiesRoutes();
