import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserInstance } from '../../../database/models/User';
import bulkFormat from '../../../../utils/bulkFormat';
import ProjectsInFormatter, { UserProjectProjectInFormat } from './ProjectsInFormatter';
import { ProjectAttributes } from '../../../database/models/Project';

type UserProjectInstance = {
  count: number;
  rows: UserInstance[];
};

export type UserProjectResponseFormat = {
  count: number;
  projects: UserProjectProjectInFormat[];
};

class UserProjectFormatter implements ResponseFormatter<UserProjectInstance, UserProjectResponseFormat> {
  async format(user: UserProjectInstance) {
    return await {
      count: user.count,
      projects: await bulkFormat(new ProjectsInFormatter(), <ProjectAttributes[]>user.rows[0].projectsIn)
    };
  }
}

export default UserProjectFormatter;
