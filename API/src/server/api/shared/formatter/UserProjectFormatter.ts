import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserInstance } from '../../../database/models/User';
import { UserResponseFormat } from './UserFormatter';
import bulkFormat from '../../../../utils/bulkFormat';
import ProjectsInFormatter from './ProjectsInFormatter';
import { ProjectAttributes } from '../../../database/models/Project';

export type UserProjectProjectInFormat = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  state: string;
  lead: UserResponseFormat;
};

export type UserProjectResponseFormat = {
  id: string;
  email: string;
  name: string;
  avatar: string | null | undefined;
  projectsIn: UserProjectProjectInFormat[];
};

class UserProjectFormatter implements ResponseFormatter<UserInstance, UserProjectResponseFormat> {
  async format(user: UserInstance) {
    return await {
      id: <string>user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      projectsIn: await bulkFormat(new ProjectsInFormatter(), <ProjectAttributes[]>user.projectsIn)
    };
  }
}

export default UserProjectFormatter;
