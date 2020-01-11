import { documentation } from '../../../../utils';
import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import BacklogController from './BacklogController';

class BacklogRoutes extends MainRoutes {
  path: string = '/backlog';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'POST',
        path: '/get_project_backlog',
        options: {
          handler: (req, res) => new BacklogController(req, res).getProjectBacklog()
        }
      }
    ];
  }
}

export default new BacklogRoutes();
