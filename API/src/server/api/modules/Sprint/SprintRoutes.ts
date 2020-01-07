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
        path: '/change_state',
        options: {
          handler: (req, res) => new SprintController(req, res).changeEntryState()
        }
      },
      {
        method: 'DELETE',
        path: '/delete_entry',
        options: {
          handler: (req, res) => new SprintController(req, res).deleteEntry()
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
        path: '/remove_user',
        options: {
          handler: (req, res) => new SprintController(req, res).removeEntryUser()
        }
      },
      {
        method: 'PUT',
        path: '/update_entry',
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
      },
      {
        method: 'POST',
        path: '/add_comment',
        options: {
          handler: (req, res) => new SprintController(req, res).addComment()
        }
      },
      {
        method: 'DELETE',
        path: '/delete_comment',
        options: {
          handler: (req, res) => new SprintController(req, res).deleteComment()
        }
      },
      {
        method: 'PUT',
        path: '/update_comment',
        options: {
          handler: (req, res) => new SprintController(req, res).updateComment()
        }
      }
    ];
  }
}

export default new SprintRoutes();
