import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import SprintController from './SprintController';

class SprintRoutes extends MainRoutes {
  path: string = '/sprint';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'POST',
        path: '/get_entries',
        options: {
          handler: (req, res) => new SprintController(req, res).getSprintEntries()
        }
      },
      {
        method: 'POST',
        path: '',
        options: {
          handler: (req, res) => new SprintController(req, res).getProjectEntries()
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
      },
      {
        method: 'DELETE',
        path: '/add_user',
        options: {
          handler: (req, res) => new SprintController(req, res).removeEntryUser()
        }
      },
      {
        method: 'PUT',
        path: '/entry',
        options: {
          handler: (req, res) => new SprintController(req, res).updateEntry()
        }
      },
      {
        method: 'POST',
        path: '/add_entry',
        options: {
          handler: (req, res) => new SprintController(req, res).addEntryToSprint()
        }
      },
      {
        method: 'DELETE',
        path: '/remove_entry',
        options: {
          handler: (req, res) => new SprintController(req, res).removeEntryFromSprint()
        }
      }
    ];
  }
}

export default new SprintRoutes();
