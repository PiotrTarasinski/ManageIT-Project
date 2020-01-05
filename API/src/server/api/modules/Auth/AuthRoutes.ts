import { documentation } from '../../../../utils';
import { RouteConfig } from '../../../../typings/Hapi';
import AuthController from './AuthController';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import MainRoutes from '../../shared/routes/MainRoutes';
import { join } from 'path';
import { resolve, reject } from 'bluebird';

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
        path: '/sign_up',
        options: {
          handler: (req, res) => new AuthController(req, res).signUp(),
          description: 'Create a new user',
          notes: 'Creates a user account',
          tags: documentation('private', 'Auth'),
          plugins: {},
          auth: false
        }
      },
      {
        method: 'POST',
        path: '/test',
        options: {
          handler: async (req, res) => {
            const privateKey = await new Promise((resolve, reject) => {
              fs.readFile('src/server/key/cert_priv.pub', 'UTF-8', (err, content) => {
                if (err) {
                  reject(err);
                }
                resolve(content);
              });
            });
            const publicKey = await new Promise((resolve, reject) => {
              fs.readFile('src/server/key/cert.pub', 'UTF-8', (err, content) => {
                if (err) {
                  reject(err);
                }
                resolve(content);
              });
            });
            const signed = jwt.sign(req.payload, privateKey as string, { algorithm: 'RS256', noTimestamp: true });
            const decoded = jwt.verify(signed, publicKey as string);
            console.log(signed);
            return res.response(decoded);
          },
          tags: documentation('private', 'Auth'),
          plugins: {}
        }
      }
    ];
  }
}

export default new AuthRoutes();
