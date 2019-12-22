import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserAttributes } from '../../../database/models/User';
import { ProjectInstance, ProjectAttributes } from '../../../database/models/Project';
import bulkFormat from '../../../../utils/bulkFormat';
import UserFormatter, { UserResponseFormat } from './UserFormatter';

type ProjectUsersInstance = {
  count: number;
  rows: ProjectInstance[];
};

export type ProjectUsersResponseFormat = {
  count: number;
  users: UserResponseFormat[];
};

class ProjectUsersFormatter implements ResponseFormatter<ProjectUsersInstance, ProjectUsersResponseFormat> {
  async format(project: ProjectUsersInstance) {
    return {
      count: project.count,
      users: await bulkFormat(new UserFormatter(), <UserAttributes[]>project.rows[0].users)
    };
  }
}

export default ProjectUsersFormatter;
