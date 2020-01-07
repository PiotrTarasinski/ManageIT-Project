import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserInstance } from '../../../database/models/User';

export type UserResponseFormat = {
  id?: string;
  email: string;
  name: string;
  avatar: string | null | undefined;
  activeProjectId?: string;
  activeSprintId?: string;
};

class UserFormatter implements ResponseFormatter<UserInstance, UserResponseFormat> {
  async format(user: UserInstance, shouldHideId?: boolean) {
    if (shouldHideId) {
      return {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        activeProjectId: user.activeProjectId,
        activeSprintId: user.activeSprintId
      };
    }
    return {
      id: <string>user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      activeProjectId: user.activeProjectId,
      activeSprintId: user.activeSprintId
    };
  }
}

export default UserFormatter;
