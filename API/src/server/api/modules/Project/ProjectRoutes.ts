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
        path: '/get_tasks',
        options: {
          handler: (req, res) => new ProjectController(req, res).getProjectTasks()
        }
      },
      {
        method: 'POST',
        path: '/create_task',
        options: {
          handler: (req, res) => new ProjectController(req, res).createTask()
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
      },
      {
        method: 'POST',
        path: '/get_all_project_users_paginated',
        options: {
          handler: (req, res) => new ProjectController(req, res).getProjectUsersPaginated()
          // plugins: {
          //   routePermissions: {
          //     projects: { view: true }
          //   }
          // }
        }
      },
      {
        method: 'POST',
        path: '/get_project_roles',
        options: {
          handler: (req, res) => new ProjectController(req, res).getProjectRoles()
        }
      }
    ];
  }
}

export default new ProjectRoutes();
