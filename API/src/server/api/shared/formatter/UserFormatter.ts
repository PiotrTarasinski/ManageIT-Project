import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserInstance } from '../../../database/models/User';

export type UserResponseFormat = {
  id: string;
  email: string;
  name: string;
  avatar: string | null | undefined;
  activeProjectId?: string;
};

class UserFormatter implements ResponseFormatter<UserInstance, UserResponseFormat> {
  async format(user: UserInstance) {
    return {
      id: <string>user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      activeProjectId: user.activeProjectId
    };
  }
}

export default UserFormatter;
