import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes, UserInstance } from './User';
import { LabelInstance } from './Label';
import { TaskUserAssignAttributes } from './TaskUserAssign';
import { TaskUserReviewerAttributes } from './TaskUserReviewer';
import { SprintInstance } from './Sprint';
import { ProjectInstance } from './Project';
import { CommentInstance } from './Comment';
import { TaskSprintInstance } from './TaskSprint';
import { TaskLabelAttributes } from './TaskLabel';

export interface TaskAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  identifier: string;
  points: number;
  priority: string;
  type: string;
  title: string;
  description?: string;
  projectId: string;
  state?: 'To do' | 'In progress' | 'To review / test' | 'Done' | 'Awaiting';

  //
  // Here be associations!
  //

  labels?: LabelInstance[];
  sprints?: SprintInstance[];
  project?: ProjectInstance;
  comments?: CommentInstance[];
  tasksSprints?: TaskSprintInstance[];
}

export interface TaskInstance extends Sequelize.Instance<TaskAttributes>, TaskAttributes {
  addAssign: Sequelize.BelongsToManyAddAssociationMixin<
    UserInstance,
    UserInstance['id'],
    TaskUserAssignAttributes
  >;
  addReviewer: Sequelize.BelongsToManyAddAssociationMixin<
    UserInstance,
    UserInstance['id'],
    TaskUserReviewerAttributes
  >;
  removeAssign: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserAttributes['id']>;
  removeReviewer: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserAttributes['id']>;
  getLabels: Sequelize.BelongsToManyGetAssociationsMixin<LabelInstance>;
  setLabels: Sequelize.BelongsToManySetAssociationsMixin<LabelInstance, LabelInstance['id'], TaskLabelAttributes>;
}

export const TaskFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<TaskInstance, TaskAttributes> => {
  const attributes: SequelizeAttributes<TaskAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    projectId: {
      type: DataTypes.UUID,
      references: {
        model: 'projects',
        key: 'id'
      },
      field: 'project_id',
      onDelete: 'CASCADE',
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
    identifier: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM(['Idea', 'Task', 'Bug', 'Improvement'])
    },
    points: {
      type: DataTypes.INTEGER
    },
    priority: {
      type: DataTypes.ENUM(['High', 'Normal', 'Low'])
    },
    state: {
      type: DataTypes.ENUM(['To do', 'In progress', 'To review / test', 'Done', 'Awaiting']),
      defaultValue: 'Awaiting'
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  };

  const Task = sequelize.define<TaskInstance, TaskAttributes>('task', attributes);

  Task.associate = models => {
    Task.hasMany(models.Comment, { as: 'comments', foreignKey: 'taskId' });
    Task.belongsTo(models.Project, { as: 'project', foreignKey: 'projectId' });
    Task.belongsToMany(models.Label, { through: 'taskLabel', as: 'labels', foreignKey: 'task_id' });
    Task.hasMany(models.TaskSprint, { as: 'tasksSprints', foreignKey: 'taskId' });
  };

  return Task;
};
