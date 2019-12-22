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
      },
      {
        method: 'POST',
        path: '/get_all_project_users',
        options: {
          handler: (req, res) => new ProjectController(req, res).getProjectUsers()
        }
      }
    ];
  }
}

export default new ProjectRoutes();
