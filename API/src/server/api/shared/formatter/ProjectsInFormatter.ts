import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { UserInstance } from '../../../database/models/User';
import UserFormatter, { UserResponseFormat } from './UserFormatter';
import { ProjectInstance } from '../../../database/models/Project';

export type UserProjectProjectInFormat = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  state: string;
  lead: UserResponseFormat;
};

class ProjectsInFormatter implements ResponseFormatter<ProjectInstance, UserProjectProjectInFormat> {
  async format(project: ProjectInstance) {
    return {
      id: <string>project.id,
      createdAt:<Date>project.createdAt,
      updatedAt:<Date>project.updatedAt,
      name: project.name,
      state: project.state,
      lead: await new UserFormatter().format(<UserInstance>project.lead)
    };
  }
}

export default ProjectsInFormatter;
