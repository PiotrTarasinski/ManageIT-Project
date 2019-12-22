import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import ProjectController from './ProjectController';

class ProjectRoutes extends MainRoutes {
  path: string = '/project';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'POST',
        path: '/get_all_user_projects',
        options: {
          handler: (req, res) => new ProjectController(req, res).getUserProjects()
        }
      },
      {
        method: 'POST',
        path: '/user',
        options: {
          handler: (req, res) => new ProjectController(req, res).addUserToProject()
        }
      },
      {
        method: 'DELETE',
        path: '/user',
        options: {
          handler: (req, res) => new ProjectController(req, res).deleteUserFromProject()
        }
      }
    ];
  }
}

export default new ProjectRoutes();
