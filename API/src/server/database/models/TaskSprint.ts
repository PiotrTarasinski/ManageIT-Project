import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserInstance } from './User';
import { TaskInstance } from './Task';
import { SprintInstance } from './Sprint';
import { TaskUserAssignAttributes } from './TaskUserAssign';
import { TaskUserReviewerAttributes } from './TaskUserReviewer';

export interface TaskSprintAttributes {
  id?: string;
  sprintId?: string;
  taskId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  index: number;
  state: string;

  //
  //
  //

  assignees?: UserInstance[];
  reviewers?: UserInstance[];
  task?: TaskInstance;
  sprint?: SprintInstance;
}

export interface TaskSprintInstance extends Sequelize.Instance<TaskSprintAttributes>, TaskSprintAttributes {
  getTask: Sequelize.BelongsToGetAssociationMixin<TaskInstance>;
  addAssignee: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], TaskUserAssignAttributes>;
  addReviewer: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], TaskUserReviewerAttributes>;
  removeAssignee: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserInstance['id']>;
  removeReviewer: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserInstance['id']>;
}

export const TaskSprintFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TaskSprintInstance, TaskSprintAttributes> => {
  const attributes: SequelizeAttributes<TaskSprintAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sprintId: {
      type: DataTypes.UUID,
      references: {
        model: 'sprints',
        key: 'id'
      },
      field: 'sprint_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    taskId: {
      type: DataTypes.UUID,
      references: {
        model: 'tasks',
        key: 'id'
      },
      field: 'task_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    index: {
      type: DataTypes.INTEGER
    },
    state: {
      type: DataTypes.ENUM(['To do', 'In progress', 'To review / test', 'Done']),
      allowNull: true
    }
  };

  const TaskSprint = sequelize.define<TaskSprintInstance, TaskSprintAttributes>('tasksSprints', attributes);

  TaskSprint.associate = models => {
    TaskSprint.belongsTo(models.Sprint, { as: 'sprint', foreignKey: 'sprintId' });
    TaskSprint.belongsTo(models.Task, { as: 'task', foreignKey: 'taskId' });
    TaskSprint.belongsToMany(models.User, { through: 'taskUserAssign', as: 'assignees', foreignKey: 'task_sprint_id' });
    TaskSprint.belongsToMany(models.User, { through: 'taskUserReviewer', as: 'reviewers', foreignKey: 'task_sprint_id' });
  };

  return TaskSprint;
};
