import * as Hapi from '@hapi/hapi';
import { AuthCredentials, PluginSpecificConfiguration, RouteOptions } from '@hapi/hapi';
import {
  RoutePermissions
} from '../AppConfig/RoutePermissions';
import { UserInstance } from '../../server/database/models/User';
import { SessionTokenInstance } from '../../server/database/models/SessionToken';

export type ApiRequestAuth = Hapi.RequestAuth & {
  credentials: AuthCredentials & {
    user: UserInstance,
    token: SessionTokenInstance
  };
};

export type ApiRequest = Hapi.Request & {
  auth: ApiRequestAuth;
};

export interface AppPluginsConfiguration extends PluginSpecificConfiguration {
  index?: boolean;
  routePermissions?: {
    notes?: RoutePermissions['notes'];
  };
}

export interface AppRouteOptions extends RouteOptions {
  plugins?: AppPluginsConfiguration;
}

export interface RouteConfig extends Hapi.ServerRoute {
  options: AppRouteOptions;
}
