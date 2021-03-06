import ResponseFormatter from '../template/ResponseFormatter';
import { TaskInstance } from '../../../database/models/Task';
import UserFormatter, { UserResponseFormat } from './UserFormatter';
import bulkFormat from '../../../../utils/bulkFormat';
import { UserInstance } from '../../../database/models/User';
import LabelFormatter, { LabelResponseFormat } from './LabelFormatter';
import bulkFormatHideId from '../../../../utils/bulkFormatHideId';
import { TaskSprintInstance } from '../../../database/models/TaskSprint';
import CommentFormatter, { CommentResponseFormat } from './CommentsFormatter';

export type TaskSprintResponseFormat = {
  id: string;
  identifier: string;
  state?: string;
  type: string;
  index?: number;
  points: number;
  priority: string;
  title: string;
  description?: string;
  assign?: UserResponseFormat[];
  reviewers?: UserResponseFormat[];
  labels?: LabelResponseFormat[];
  comments?: CommentResponseFormat[];
};

class TaskSprintFormatter implements ResponseFormatter<TaskSprintInstance, TaskSprintResponseFormat> {
  async format(taskSprint: TaskSprintInstance) {
    const task = <TaskInstance>taskSprint.task;
    const labels = await task.getLabels();
    if (task.comments) {
      return {
        id: <string>task.id,
        state: taskSprint.state,
        identifier: task.identifier,
        type: task.type,
        index: taskSprint.index,
        points: task.points,
        priority: task.priority,
        title: task.title,
        description: task.description,
        assign: await bulkFormatHideId(new UserFormatter(), <UserInstance[]>taskSprint.assignees),
        reviewers: await bulkFormatHideId(new UserFormatter(), <UserInstance[]>taskSprint.reviewers),
        labels: await bulkFormat(new LabelFormatter(), labels),
        comments: await bulkFormat(new CommentFormatter(), task.comments)
      };
    }
    return {
      id: <string>task.id,
      state: taskSprint.state,
      identifier: task.identifier,
      type: task.type,
      index: taskSprint.index,
      points: task.points,
      priority: task.priority,
      title: task.title,
      description: task.description,
      assign: await bulkFormatHideId(new UserFormatter(), <UserInstance[]>taskSprint.assignees),
      reviewers: await bulkFormatHideId(new UserFormatter(), <UserInstance[]>taskSprint.reviewers),
      labels: await bulkFormat(new LabelFormatter(), labels)
    };
  }
}

export default TaskSprintFormatter;
