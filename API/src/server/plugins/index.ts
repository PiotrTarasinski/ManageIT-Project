import * as Hapi from '@hapi/hapi';
import IPlugin from './interface/IPlugin';
import Swagger from './Swagger';
import Logger from './Logger';
import TokenValidator from './TokenValidator';
import RoutePermissionsValidator from './RoutePermissionsValidator';

function registerPlugins(server: Hapi.Server) {
  const plugins: IPlugin[] = [
    Swagger,
    Logger,
    TokenValidator,
    RoutePermissionsValidator
  ];

  return Promise.all(
    plugins.map(
      pluginInstance => pluginInstance.register(server)
    )
  );
}

export default registerPlugins;
