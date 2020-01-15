import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserAttributes, UserInstance } from '../../../database/models/User';
import { ProjectInstance } from '../../../database/models/Project';
import UserFormatter, { UserResponseFormat } from './UserFormatter';
import bulkFormatHideId from '../../../../utils/bulkFormatHideId';
import UserWithLabelFormatter, { UserWithLabelResponseFormat } from './UserWithLabelsFormatter';

type ProjectUsersInstance = {
  count: number;
  project: ProjectInstance;
};

export type ProjectUsersResponseFormat = {
  count: number;
  users: UserWithLabelResponseFormat[];
};

class ProjectUsersFormatter implements ResponseFormatter<ProjectUsersInstance, ProjectUsersResponseFormat> {
  async format(projectCountObject: ProjectUsersInstance) {
    return {
      count: projectCountObject.count,
      // tslint:disable-next-line:max-line-length
      users: await Promise.all((<UserInstance[]>projectCountObject.project.users).map(async user => await new UserWithLabelFormatter().format(user, projectCountObject.project.id)))
    };
  }
}

export default ProjectUsersFormatter;
