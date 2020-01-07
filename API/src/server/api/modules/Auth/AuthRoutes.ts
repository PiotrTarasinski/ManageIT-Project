import { documentation } from '../../../../utils';
import { RouteConfig } from '../../../../typings/Hapi';
import AuthController from './AuthController';
import MainRoutes from '../../shared/routes/MainRoutes';

class AuthRoutes extends MainRoutes {

  path: string = '/auth';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'POST',
        path: '/login',
        options: {
          handler: (req, res) => new AuthController(req, res).login(),
          description: 'Login into the application',
          tags: documentation('private', 'Auth'),
          auth: false
        }
      },
      {
        method: 'GET',
        path: '/validate_token',
        options: {
          handler: (req, res) => new AuthController(req, res).validateToken(),
          description: 'Validate a token',
          notes: 'Validates a token',
          tags: documentation('private', 'Auth'),
          validate: {}
        }
      },
      {
        method: 'POST',
        path: '/set_active_project',
        options: {
          handler: (req, res) => new AuthController(req, res).setActiveProject()
        }
      },
      {
        method: 'POST',
        path: '/set_active_sprint',
        options: {
          handler: (req, res) => new AuthController(req, res).setActiveSprint()
        }
      },
      {
        method: 'POST',
        path: '/sign_up',
        options: {
          handler: (req, res) => new AuthController(req, res).signUp(),
          description: 'Create a new user',
          notes: 'Creates a user account',
          tags: documentation('private', 'Auth'),
          plugins: {},
          auth: false
        }
      }
    ];
  }
}

export default new AuthRoutes();
