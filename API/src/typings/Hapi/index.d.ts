import * as Hapi from '@hapi/hapi';
import { AuthCredentials, PluginSpecificConfiguration, RouteOptions } from '@hapi/hapi';
import {
  RoutePermissions
} from '../AppConfig/RoutePermissions';
import { UserInstance } from '../../server/database/models/User';

export type ApiRequestAuth = Hapi.RequestAuth & {
  credentials: AuthCredentials & {
    user: UserInstance,
    token: string
  };
};

export type ApiRequest = Hapi.Request & {
  auth: ApiRequestAuth;
};

export interface AppPluginsConfiguration extends PluginSpecificConfiguration {
  index?: boolean;
  routePermissions?: {
    projects?: RoutePermissions['notes'];
  };
}

export interface AppRouteOptions extends RouteOptions {
  plugins?: AppPluginsConfiguration;
}

export interface RouteConfig extends Hapi.ServerRoute {
  options: AppRouteOptions;
}
