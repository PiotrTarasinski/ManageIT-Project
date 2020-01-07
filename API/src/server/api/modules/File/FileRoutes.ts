import { documentation } from '../../../../utils';
import { RouteConfig } from '../../../../typings/Hapi';
import MainRoutes from '../../shared/routes/MainRoutes';
import FileController from './FileController';

class FileRoutes extends MainRoutes {
  path: string = '/file';

  getRoutes(): RouteConfig[] {
    return [
      {
        method: 'GET',
        path: '/avatar/{param*}',
        handler: {
          directory: {
            path: './avatar',
            redirectToSlash: true,
            index: true
          }
        },
        options: {
          description: 'Get user avatar.',
          auth: false,
          tags: documentation('public', 'Avatar')
        }
      },
      {
        method: 'POST',
        path: '/avatar',
        options: {
          handler: (req, res) => new FileController(req, res).setAvatar(),
          description: 'Set or update user avatar.',
          tags: documentation('private', 'Avatar'),
          payload: {
            maxBytes: 10485760,
            output: 'stream',
            parse: true
          }
        }
      },
      {
        method: 'DELETE',
        path: '/avatar',
        options: {
          handler: (req, res) => new FileController(req, res).deleteAvatar(),
          description: 'Delete user avatar.',
          tags: documentation('private', 'Avatar')
        }
      }
    ];
  }
}

export default new FileRoutes();
