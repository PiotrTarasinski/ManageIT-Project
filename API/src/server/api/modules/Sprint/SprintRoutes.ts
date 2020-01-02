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
        path: '/change_state',
        options: {
          handler: (req, res) => new SprintController(req, res).changeEntryState()
        }
      },
      {
        method: 'DELETE',
        path: '/entry',
        options: {
          handler: (req, res) => new SprintController(req, res).deleteEntry()
        }
      },
      {
        method: 'POST',
        path: '/entry',
        options: {
          handler: (req, res) => new SprintController(req, res).createEntry()
        }
      },
      {
        method: 'POST',
        path: '/add_user',
        options: {
          handler: (req, res) => new SprintController(req, res).addEntryUser()
        }
      }
    ];
  }
}

export default new SprintRoutes();
