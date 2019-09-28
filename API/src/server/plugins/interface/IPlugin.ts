import { Server } from '@hapi/hapi';

interface IPlugin {
  register: (server: Server) => Promise<void>;
}

export default IPlugin;
