import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { BacklogInstance } from '../../../database/models/Backlog';
import UserFormatter, { UserResponseFormat } from './UserFormatter';
import { UserInstance } from '../../../database/models/User';

export type BacklogResponseFormat = {
  content: string;
  createdAt: Date;
  user?: UserResponseFormat;
};

class BacklogFormatter implements ResponseFormatter<BacklogInstance, BacklogResponseFormat> {
  async format(backlog: BacklogInstance) {
    return {
      content: backlog.content,
      createdAt: <Date>backlog.createdAt,
      user: await new UserFormatter().format(<UserInstance>backlog.user, true)
    };
  }
}

export default BacklogFormatter;
