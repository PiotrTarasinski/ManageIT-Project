import { documentation } from '../../../../utils';
import * as Joi from 'joi';
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
          notes: `Before using any other endpoint copy the access_token
from the Response Headers panel and paste it into the input
at the top of the page (next to Bearer, without removing the blank space)
then press Enter.`,
          tags: documentation('private', 'Auth'),
          validate: {
            payload: {
              username: Joi.string().allow('').required(),
              password: Joi.string().allow('').required()
            }
          },
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
          validate: {
            payload: {
              email: Joi.string().email().required(),
              password: Joi.string().required(),
              confirmPassword: Joi.string().valid(Joi.ref('password')).required()
            }
          },
          auth: false
        }
      }
    ];
  }
}

export default new AuthRoutes();
