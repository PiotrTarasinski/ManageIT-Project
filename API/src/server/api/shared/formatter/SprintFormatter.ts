import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { ProjectInstance } from '../../../database/models/Project';
import { SprintInstance } from '../../../database/models/Sprint';
import { SprintEntryAttributes, SprintEntryInstance } from '../../../database/models/SprintEntry';
import bulkFormat from '../../../../utils/bulkFormat';
import SprintEntriesFormatter, { SprintEntriesResponseFormat } from './SprintEntriesFormatter';
import CommentFormatter, { CommentResponseFormat } from './CommentsFormatter';

export type SprintResponseFormat = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  taskList?: {
    toDoList: SprintEntriesResponseFormat[];
    inProgressList: SprintEntriesResponseFormat[];
    toReviewList: SprintEntriesResponseFormat[];
    doneList: SprintEntriesResponseFormat[];
  }
};

class SprintFormatter implements ResponseFormatter<SprintInstance, SprintResponseFormat> {
  async format(sprint: SprintInstance) {
    const toDoList: SprintEntryInstance[] = [];
    const inProgressList: SprintEntryInstance[] = [];
    const toReviewList: SprintEntryInstance[] = [];
    const doneList: SprintEntryInstance[] = [];
    (sprint.sprintEntries as SprintEntryInstance[]).forEach(async entry => {
      if (entry.state && entry.state === 'To do') {
        toDoList.push(entry);
      } else if (entry.state && entry.state === 'In progress') {
        inProgressList.push(entry);
      } else if (entry.state && entry.state === 'To review / test') {
        toReviewList.push(entry);
      } else {
        doneList.push(entry);
      }
    });
    return {
      id: <string>sprint.id,
      name: sprint.name,
      description: sprint.description,
      startDate: new Date(sprint.start),
      endDate: new Date(sprint.end),
      taskList: {
        toDoList: await bulkFormat(new SprintEntriesFormatter(), toDoList),
        inProgressList: await bulkFormat(new SprintEntriesFormatter(), inProgressList),
        toReviewList: await bulkFormat(new SprintEntriesFormatter(), toReviewList),
        doneList: await bulkFormat(new SprintEntriesFormatter(), doneList)
      }
    };
  }
}

export default SprintFormatter;
