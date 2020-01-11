import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';

export interface TaskLabelAttributes {
  taskId: string;
  labelId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskLabelInstance extends Sequelize.Instance<TaskLabelAttributes>, TaskLabelAttributes { }

export const TaskLabelFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TaskLabelInstance, TaskLabelAttributes> => {
  const attributes: SequelizeAttributes<TaskLabelAttributes> = {
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
    labelId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'labels',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'label_id'
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

  const TaskLabel = sequelize.define<TaskLabelInstance, TaskLabelAttributes>('taskLabel', attributes);


  return TaskLabel;
};
