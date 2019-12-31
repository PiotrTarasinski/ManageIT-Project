import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import SprintController from './SprintController';

class SprintRoutes extends MainRoutes {
  path: string = '/sprint';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'POST',
        path: '',
        options: {
          handler: (req, res) => new SprintController(req, res).getSprintEntries()
        }
      }
    ];
  }
}

export default new SprintRoutes();
