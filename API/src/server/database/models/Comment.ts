import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserInstance } from './User';

export interface CommentAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  content: string;
  userId: string;
  taskId: string;

  //
  // Here be associations!
  //

  user?: UserInstance;
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
}

export const CommentFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
): Sequelize.Model<CommentInstance, CommentAttributes> => {
  const attributes: SequelizeAttributes<CommentAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    taskId: {
      type: DataTypes.UUID,
      references: {
        model: 'tasks',
        key: 'id'
      },
      field: 'task_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    content: {
      type: DataTypes.STRING
    }
  };

  const Comment = sequelize.define<CommentInstance, CommentAttributes>('comment', attributes);


  Comment.associate = models => {
    Comment.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Comment.belongsTo(models.Task, { as: 'task', foreignKey: 'taskId' });
  };

  return Comment;
};
