import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { ProjectInstance } from '../../../database/models/Project';

export type UserProjectProjectInFormat = {
  id: string;
  createdAt: Date;
  name: string;
  state: string;
  lead?: UserLeadFormat;
};

type UserLeadFormat = {
  id: string;
  name: string;
  avatar: string | null | undefined;
};

class ProjectsInFormatter implements ResponseFormatter<ProjectInstance, UserProjectProjectInFormat> {
  async format(project: ProjectInstance) {
    if (project.lead) {
      return {
        id: <string>project.id,
        createdAt: <Date>project.createdAt,
        name: project.name,
        state: project.state,
        lead: {
          id: <string>project.lead.id,
          name: project.lead.name,
          avatar: project.lead.avatar
        }
      };
    }
    return {
      id: <string>project.id,
      createdAt: <Date>project.createdAt,
      name: project.name,
      state: project.state
    };
  }
}

export default ProjectsInFormatter;
