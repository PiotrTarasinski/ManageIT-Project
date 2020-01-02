import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { ProjectInstance } from '../../../database/models/Project';
import { SprintInstance } from '../../../database/models/Sprint';
import { SprintEntryAttributes, SprintEntryInstance } from '../../../database/models/SprintEntry';
import bulkFormat from '../../../../utils/bulkFormat';
import SprintEntriesFormatter, { SprintEntriesResponseFormat } from './SprintEntriesFormatter';

export type SprintResponseFormat = {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  entries?: SprintEntriesResponseFormat[]
};

class SprintFormatter implements ResponseFormatter<ProjectInstance, SprintResponseFormat> {
  async format(project: ProjectInstance) {
    const sprint = <SprintInstance>project.activeSprint;
    return {
      id: <string>sprint.id,
      name: sprint.name,
      description: sprint.description,
      start: new Date(sprint.start),
      end: new Date(sprint.end),
      entries: await bulkFormat(new SprintEntriesFormatter(), <SprintEntryInstance[]>sprint.sprintEntries)
    };
  }
}

export default SprintFormatter;
