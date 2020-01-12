import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';

export interface TaskUserReviewerAttributes {
  taskId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskUserReviewerInstance extends Sequelize.Instance<TaskUserReviewerAttributes>, TaskUserReviewerAttributes { }

export const TaskUserReviewerFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TaskUserReviewerInstance, TaskUserReviewerAttributes> => {
  const attributes: SequelizeAttributes<TaskUserReviewerAttributes> = {
    taskId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'tasksSprints',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'task_sprint_id'
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'user_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  };

  const TaskUserReviewer = sequelize.define<TaskUserReviewerInstance, TaskUserReviewerAttributes>('taskUserReviewer', attributes);

  return TaskUserReviewer;
};
