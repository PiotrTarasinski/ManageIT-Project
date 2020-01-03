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
  startDate: Date;
  endDate: Date;
  taskList?: SprintEntriesResponseFormat[]
};

class SprintFormatter implements ResponseFormatter<SprintInstance, SprintResponseFormat> {
  async format(sprint: SprintInstance) {
    return {
      id: <string>sprint.id,
      name: sprint.name,
      description: sprint.description,
      startDate: new Date(sprint.start),
      endDate: new Date(sprint.end),
      taskList: await bulkFormat(new SprintEntriesFormatter(), <SprintEntryInstance[]>sprint.sprintEntries)
    };
  }
}

export default SprintFormatter;
