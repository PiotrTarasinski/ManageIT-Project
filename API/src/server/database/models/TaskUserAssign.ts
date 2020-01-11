import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';

export interface TaskUserAssignAttributes {
  taskId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskUserAssignInstance extends Sequelize.Instance<TaskUserAssignAttributes>, TaskUserAssignAttributes { }

export const TaskUserAssignFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TaskUserAssignInstance, TaskUserAssignAttributes> => {
  const attributes: SequelizeAttributes<TaskUserAssignAttributes> = {
    taskId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'tasks',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'task_id'
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

  const TaskUserAssign = sequelize.define<TaskUserAssignInstance, TaskUserAssignAttributes>('taskUserAssign', attributes);

  return TaskUserAssign;
};
