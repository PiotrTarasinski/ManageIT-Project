import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import SprintController from './SprintController';

class SprintRoutes extends MainRoutes {
  path: string = '/sprint';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'POST',
        path: '/get_tasks',
        options: {
          handler: (req, res) => new SprintController(req, res).getSprintTasks()
        }
      },
      {
        method: 'POST',
        path: '/change_state',
        options: {
          handler: (req, res) => new SprintController(req, res).changeTaskState()
        }
      },
      {
        method: 'DELETE',
        path: '/remove_task_from_sprint',
        options: {
          handler: (req, res) => new SprintController(req, res).removeTaskFromSprint()
        }
      },
      {
        method: 'POST',
        path: '/add_user',
        options: {
          handler: (req, res) => new SprintController(req, res).addTaskUser()
        }
      },
      {
        method: 'PUT',
        path: '/update_task',
        options: {
          handler: (req, res) => new SprintController(req, res).updateTask()
        }
      },
      {
        method: 'POST',
        path: '/add_task',
        options: {
          handler: (req, res) => new SprintController(req, res).addTaskToSprint()
        }
      },
      {
        method: 'DELETE',
        path: '/remove_task',
        options: {
          handler: (req, res) => new SprintController(req, res).removeTaskFromSprint()
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
