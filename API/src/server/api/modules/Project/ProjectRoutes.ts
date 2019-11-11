import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import ProjectController from './ProjectController';

class ProjectRoutes extends MainRoutes {
  path: string = '/project';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'GET',
        path: '/',
        options: {
          handler: (req, res) => new ProjectController(req, res).getUserProjects()
        }
      }
    ];
  }
}

export default new ProjectRoutes();
