import ResponseFormatter from '../template/ResponseFormatter';
import { TaskInstance } from '../../../database/models/Task';
import UserFormatter, { UserResponseFormat } from './UserFormatter';
import bulkFormat from '../../../../utils/bulkFormat';
import { UserInstance } from '../../../database/models/User';
import LabelFormatter, { LabelResponseFormat } from './LabelFormatter';
import CommentFormatter, { CommentResponseFormat } from './CommentsFormatter';
import { CommentInstance } from '../../../database/models/Comment';
import bulkFormatHideId from '../../../../utils/bulkFormatHideId';

export type TaskResponseFormat = {
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

class TaskFormatter implements ResponseFormatter<TaskInstance, TaskResponseFormat> {
  async format(task: TaskInstance) {
    const labels = await task.getLabels();
    return {
      id: <string>task.id,
      state: task.state,
      identifier: task.identifier,
      type: task.type,
      index: task.index,
      points: task.points,
      priority: task.priority,
      title: task.title,
      description: task.description,
      assign: await bulkFormatHideId(new UserFormatter(), <UserInstance[]>task.assign),
      reviewers: await bulkFormatHideId(new UserFormatter(), <UserInstance[]>task.reviewers),
      labels: await bulkFormat(new LabelFormatter(), labels),
      comments: await bulkFormatHideId(new CommentFormatter(), <CommentInstance[]>task.comments)
    };
  }
}

export default TaskFormatter;
