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
      },
      {
        method: 'POST',
        path: '/change_type',
        options: {
          handler: (req, res) => new SprintController(req, res).changeEntryType()
        }
      }
    ];
  }
}

export default new SprintRoutes();
