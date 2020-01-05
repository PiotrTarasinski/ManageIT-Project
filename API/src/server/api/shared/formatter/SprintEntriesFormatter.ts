import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { ProjectInstance } from '../../../database/models/Project';
import { SprintInstance } from '../../../database/models/Sprint';
import { SprintEntryInstance } from '../../../database/models/SprintEntry';
import UserFormatter, { UserResponseFormat } from './UserFormatter';
import bulkFormat from '../../../../utils/bulkFormat';
import { UserInstance } from '../../../database/models/User';
import LabelFormatter, { LabelResponseFormat } from './LabelFormatter';
import { LabelInstance } from '../../../database/models/Label';
import CommentFormatter, { CommentResponseFormat } from './CommentsFormatter';
import { CommentInstance } from '../../../database/models/Comment';

export type SprintEntriesResponseFormat = {
  id: string;
  identifier: string;
  state?: string;
  type: string;
  index?: number;
  points: number;
  priority: string;
  title: string;
  description?: string;
  assign: UserResponseFormat[];
  reviewers: UserResponseFormat[];
  labels: LabelResponseFormat[];
  comments?: CommentResponseFormat[];
};

class SprintEntriesFormatter implements ResponseFormatter<SprintEntryInstance, SprintEntriesResponseFormat> {
  async format(sprintEntry: SprintEntryInstance) {
    return {
      id: <string>sprintEntry.id,
      state: sprintEntry.state,
      identifier: sprintEntry.identifier,
      type: sprintEntry.type,
      index: sprintEntry.index,
      points: sprintEntry.points,
      priority: sprintEntry.priority,
      title: sprintEntry.title,
      description: sprintEntry.description,
      assign: await bulkFormat(new UserFormatter(), <UserInstance[]>sprintEntry.assign),
      reviewers: await bulkFormat(new UserFormatter(), <UserInstance[]>sprintEntry.reviewers),
      labels: await bulkFormat(new LabelFormatter(), <LabelInstance[]>sprintEntry.labels),
      comments: await bulkFormat(new CommentFormatter(), <CommentInstance[]>sprintEntry.comments)
    };
  }
}

export default SprintEntriesFormatter;
