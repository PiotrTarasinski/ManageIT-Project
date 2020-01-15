import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { RoleLabelInstance } from '../../../database/models/RoleLabel';
import { UserInstance } from '../../../database/models/User';
import bulkFormat from '../../../../utils/bulkFormat';
import RoleLabelFormatter, { RoleLabelResponseFormat } from './RoleLabelFormatter';
import { UserProjectInstance } from '../../../database/models/UserProject';

export type UserWithLabelResponseFormat = {
  id: string;
  name: string;
  email: string;
  avatar: string | null | undefined;
  permissions?: string;
  roles?: RoleLabelResponseFormat[];
};

class UserWithLabelFormatter implements ResponseFormatter<UserInstance, UserWithLabelResponseFormat> {
  async format(user: UserInstance, projectId?: string) {
    if (projectId) {
      const projectsLabels = await user.getUsersProjectsLabels({ where: { projectId } });
      const labels = await Promise.all(projectsLabels.map(async projectsLabels => await projectsLabels.getRoleLabel()));
      return {
        id: <string>user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        permissions: (<UserProjectInstance[]>user.permissions)[0].permissions,
        dateOfJoin: (<UserProjectInstance[]>user.permissions)[0].createdAt,
        roles: await bulkFormat(new RoleLabelFormatter(), labels)
      };
    }
    return {
      id: <string>user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      permissions: (<UserProjectInstance[]>user.permissions)[0].permissions,
      dateOfJoin: (<UserProjectInstance[]>user.permissions)[0].createdAt
    };
  }
}

export default UserWithLabelFormatter;
