import ResponseFormatter from '../template/ResponseFormatter';
import { TaskInstance } from '../../../database/models/Task';
import bulkFormat from '../../../../utils/bulkFormat';
import LabelFormatter, { LabelResponseFormat } from './LabelFormatter';
import CommentFormatter, { CommentResponseFormat } from './CommentsFormatter';

export type TaskResponseFormat = {
  id: string;
  identifier: string;
  type: string;
  points: number;
  priority: string;
  title: string;
  description?: string;
  state?: string;
  labels?: LabelResponseFormat[];
  comments?: CommentResponseFormat[];
};

class TaskFormatter implements ResponseFormatter<TaskInstance, TaskResponseFormat> {
  async format(task: TaskInstance) {
    const labels = await task.getLabels();
    if (task.comments) {
      return {
        id: <string>task.id,
        identifier: task.identifier,
        type: task.type,
        points: task.points,
        priority: task.priority,
        title: task.title,
        state: task.state,
        description: task.description,
        labels: await bulkFormat(new LabelFormatter(), labels),
        comments: await bulkFormat(new CommentFormatter(), task.comments)
      };
    }
    return {
      id: <string>task.id,
      identifier: task.identifier,
      type: task.type,
      points: task.points,
      priority: task.priority,
      title: task.title,
      state: task.state,
      description: task.description,
      labels: await bulkFormat(new LabelFormatter(), labels)
    };
  }
}

export default TaskFormatter;
