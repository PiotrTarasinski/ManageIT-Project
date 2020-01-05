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
        path: '/create_project',
        options: {
          handler: (req, res) => new ProjectController(req, res).createProject()
        }
      },
      {
        method: 'DELETE',
        path: '/delete_project',
        options: {
          handler: (req, res) => new ProjectController(req, res).deleteProject()
        }
      },
      {
        method: 'PUT',
        path: '/update_project',
        options: {
          handler: (req, res) => new ProjectController(req, res).updateProject()
        }
      },
      {
        method: 'POST',
        path: '/get_entries',
        options: {
          handler: (req, res) => new ProjectController(req, res).getProjectEntries()
        }
      },
      {
        method: 'POST',
        path: '/create_entry',
        options: {
          handler: (req, res) => new ProjectController(req, res).createEntry()
        }
      },
      {
        method: 'POST',
        path: '/get_all_project_users',
        options: {
          handler: (req, res) => new ProjectController(req, res).getProjectUsers()
          // plugins: {
          //   routePermissions: {
          //     projects: { view: true }
          //   }
          // }
        }
      }
    ];
  }
}

export default new ProjectRoutes();
