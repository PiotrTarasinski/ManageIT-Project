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
          notes: 'Password needs to fullfill 3  out of 4 rules: lowecase, uppercase, special and number.',
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
        method: 'DELETE',
        path: '/logout',
        options: {
          handler: (req, res) => new AuthController(req, res).logout(),
          description: 'Log out',
          notes: 'Logs out of the app',
          tags: documentation('private', 'Auth'),
          plugins: {}
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
