import IPlugin from './interface/IPlugin';
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import * as _ from 'lodash';
import ApiError from '../api/error/ApiError';
import { RoutePermissions } from '../../typings/AppConfig/RoutePermissions';
import { AccountRole } from '../database/models/User';
import db from '../database';
import Boom = require('boom');

type Roles = {
  isAdmin: boolean;
  isSupervisor: boolean;
  isModerator: boolean;
};

class RoutePermissionsValidator implements IPlugin {

  register(server: Server): Promise<any> {

    server.ext(
      'onPostAuth',
      (...params) => this.validatePermissions(...params)
    );

    return Promise.resolve();
  }

  private requiredPermissions = {
    view: {
      isAdmin: true,
      isSupervisor: true,
      isModerator: true
    }
  };

  private async validatePermissions(request: Request, reply: ResponseToolkit, err?: Error) {
    const { auth, route, payload }: any = request;
    const { plugins } = route.settings;

    if (plugins && plugins.routePermissions && auth.credentials) {
      if (payload && payload.projectId && plugins.routePermissions.projects) {
        const user = await db.UserProject.findOne({
          where: {
            userId: auth.credentials.user.id,
            projectId: payload.projectId
          }
        });
        if (user) {
          const { isAdmin, isSupervisor, isModerator } = user;
          this.evaluateProjectPermissions(plugins.routePermissions.projects, {
            isAdmin: <boolean>isAdmin,
            isSupervisor: <boolean>isSupervisor,
            isModerator: <boolean>isModerator
          });
          return reply.continue;
        }
        return Boom.unauthorized('Unathorized.');
      }
    }

    if (plugins && plugins.routePermissions && auth && auth.credentials) {
      const { role } = auth.credentials.user;

      if (role === null) {
        return reply.unauthenticated(ApiError.boom(null, { statusCode: 403 }));
      }

      let allPermissionsMatching: boolean = false;
      try {
        // find all permissions for the requesting user's role
        allPermissionsMatching = await this.evaluateRolePermissionValues(plugins.routePermissions, role, request);
      } catch (e) {
        throw ApiError.boom(null, { statusCode: 403 });
      }

      if (!allPermissionsMatching) {
        throw ApiError.boom(null, { statusCode: 403 });
      }
    }

    return reply.continue;
  }

  private async evaluateProjectPermissions(routePermissions: any, roles: Roles) {
    console.log(routePermissions);
    Object.keys(routePermissions).map(async (perm) => {
      console.log(perm);
    });
  }

  private async evaluateRolePermissionValues(routePermissions: any, role: AccountRole, request: Request) {
    let allGroupPermissionsMatched = true;

    // for each permission group(user, dashboard etc.) passed to the plugin
    await Promise.all(
      (<(keyof RoutePermissions)[]>Object.keys(routePermissions)).map(async (permGroup) => {
        return await Promise.all(
          Object.keys(routePermissions[permGroup]).map(
            async (perm) => {
              // if needed, evaluate an extra validator function (defined in app.ts)
              if (_.isFunction(routePermissions[permGroup][perm])) {
                // and assign it for later comparison
                const permissionGranted = await routePermissions[permGroup][perm](request);

                if (!permissionGranted) {
                  allGroupPermissionsMatched = false;
                }
              }
            }
          )
        );
      })
    );

    return allGroupPermissionsMatched;
  }
}

export default new RoutePermissionsValidator();
