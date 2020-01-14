import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserInstance } from '../../../database/models/User';
import UserProjectLabelFormatter, { UserProjectLabelResponseFormat } from './UserProjectLabelFormatter';
import bulkFormat from '../../../../utils/bulkFormat';

export type UserResponseFormat = {
  id?: string;
  email: string;
  name: string;
  avatar: string | null | undefined;
  activeProjectId?: string;
  activeSprintId?: string;
  permissions?: string;
  dateOfJoin?: Date;
  roles?: UserProjectLabelResponseFormat[];
};

class UserFormatter implements ResponseFormatter<UserInstance, UserResponseFormat> {
  async format(user: UserInstance, shouldHideIds?: boolean) {
    if (shouldHideIds) {
      if (user.usersProjects) {
        if (user.usersProjectsLabels) {
          return {
            id: <string>user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            permissions: user.usersProjects.permissions,
            dateOfJoin: user.usersProjects.createdAt,
            roles: await bulkFormat(new UserProjectLabelFormatter(), user.usersProjectsLabels)
          };
        }
        return {
          id: <string>user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          permissions: user.usersProjects.permissions,
          dateOfJoin: user.usersProjects.createdAt
        };

      }
      return {
        id: <string>user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      };
    }
    if (user.permissions) {
      if (user.usersProjectsLabels) {
        return {
          id: <string>user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          permissions: user.permissions[0].permissions,
          dateOfJoin: user.permissions[0].createdAt,
          roles: await bulkFormat(new UserProjectLabelFormatter(), user.usersProjectsLabels)
        };
      }
      return {
        id: <string>user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        permissions: user.permissions[0].permissions,
        dateOfJoin: user.permissions[0].createdAt
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
