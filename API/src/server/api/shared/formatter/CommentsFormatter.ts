import ResponseFormatter from '../../shared/template/ResponseFormatter';
import { CommentInstance } from '../../../database/models/Comment';
import UserFormatter, { UserResponseFormat } from './UserFormatter';
import { UserInstance } from '../../../database/models/User';

export type CommentResponseFormat = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user?: UserResponseFormat;
};

class CommentFormatter implements ResponseFormatter<CommentInstance, CommentResponseFormat> {
  async format(comment: CommentInstance) {
    return {
      id: <string>comment.id,
      content: comment.content,
      createdAt: <Date>comment.createdAt,
      updatedAt: <Date>comment.updatedAt,
      user: await new UserFormatter().format(<UserInstance>comment.user, true)
    };
  }
}

export default CommentFormatter;
