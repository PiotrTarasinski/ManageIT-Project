import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import LabelController from './LabelController';

class LabelRoutes extends MainRoutes {
  path: string = '/label';

  getRoutes(): RouteConfig[] {
    return [
      // Create task
      {
        method: 'POST',
        path: '/get_labels',
        options: {
          handler: (req, res) => new LabelController(req, res).getProjectLabels()
        }
      },
      {
        method: 'POST',
        path: '/get_roles',
        options: {
          handler: (req, res) => new LabelController(req, res).getProjectRoles()
        }
      },
      {
        method: 'POST',
        path: '/create_label',
        options: {
          handler: (req, res) => new LabelController(req, res).createProjectLabel()
        }
      },
      {
        method: 'POST',
        path: '/create_role',
        options: {
          handler: (req, res) => new LabelController(req, res).createProjectRole()
        }
      },
      {
        method: 'PUT',
        path: '/update_label',
        options: {
          handler: (req, res) => new LabelController(req, res).updateProjectLabel()
        }
      },
      {
        method: 'PUT',
        path: '/update_role',
        options: {
          handler: (req, res) => new LabelController(req, res).updateProjectRole()
        }
      },
      {
        method: 'DELETE',
        path: '/delete_label',
        options: {
          handler: (req, res) => new LabelController(req, res).deleteProjectLabel()
        }
      },
      {
        method: 'DELETE',
        path: '/delete_role',
        options: {
          handler: (req, res) => new LabelController(req, res).deleteProjectRole()
        }
      }
    ];
  }
}

export default new LabelRoutes();
