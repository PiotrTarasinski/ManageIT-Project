import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { ProjectInstance } from '../../../database/models/Project';
import { SprintEntryInstance } from '../../../database/models/SprintEntry';
import bulkFormat from '../../../../utils/bulkFormat';
import SprintEntriesFormatter, { SprintEntriesResponseFormat } from './SprintEntriesFormatter';

export type ProjectEntriesResponseFormat = {
  taskList: SprintEntriesResponseFormat[]
};

class ProjectEntriesFormatter implements ResponseFormatter<ProjectInstance, ProjectEntriesResponseFormat> {
  async format(project: ProjectInstance) {
    return {
      taskList: await bulkFormat(new SprintEntriesFormatter(), <SprintEntryInstance[]>project.entries)
    };
  }
}

export default ProjectEntriesFormatter;
