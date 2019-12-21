import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import ProjectController from './ProjectController';

class ProjectRoutes extends MainRoutes {
  path: string = '/project';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'GET',
        path: '/get_all_user_projects',
        options: {
          handler: (req, res) => new ProjectController(req, res).getUserProjects()
        }
      },
      {
        method: 'POST',
        path: '/add_user_to_project',
        options: {
          handler: (req, res) => new ProjectController(req, res).getUserProjects()
        }
      }
    ];
  }
}

export default new ProjectRoutes();
