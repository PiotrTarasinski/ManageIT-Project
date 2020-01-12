import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import TaskController from './TaskController';

/*
  Task:
    Create: √ + Backlog
    Update: √ + Backlog
    Delete: √ + Backlog

  Comment:
    Create: √
    Update: √
    Delete: √
*/

class TaskRoutes extends MainRoutes {
  path: string = '/task';

  getRoutes(): RouteConfig[] {
    return [
      // Create task
      {
        method: 'POST',
        path: '/create_task',
        options: {
          handler: (req, res) => new TaskController(req, res).createTask()
        }
      },
      // Update task
      {
        method: 'PUT',
        path: '/update_task',
        options: {
          handler: (req, res) => new TaskController(req, res).updateTask()
        }
      },
      // Delete task
      {
        method: 'DELETE',
        path: '/delete_task',
        options: {
          handler: (req, res) => new TaskController(req, res).deleteTask()
        }
      },
      // Create comment
      {
        method: 'POST',
        path: '/add_comment',
        options: {
          handler: (req, res) => new TaskController(req, res).createComment()
        }
      },
      // Update comment
      {
        method: 'PUT',
        path: '/update_comment',
        options: {
          handler: (req, res) => new TaskController(req, res).updateComment()
        }
      },
      // Delete comment
      {
        method: 'DELETE',
        path: '/delete_comment',
        options: {
          handler: (req, res) => new TaskController(req, res).deleteComment()
        }
      }
    ];
  }
}

export default new TaskRoutes();
