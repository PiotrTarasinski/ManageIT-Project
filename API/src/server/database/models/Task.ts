import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes, UserInstance } from './User';
import { LabelInstance } from './Label';
import { TaskUserAssignAttributes } from './TaskUserAssign';
import { TaskUserReviewerAttributes } from './TaskUserReviewer';
import { SprintInstance } from './Sprint';
import { ProjectInstance } from './Project';
import { CommentInstance } from './Comment';

export interface TaskAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  identifier: string;
  index?: number;
  points: number;
  priority: string;
  state?: string;
  type: string;
  title: string;
  description?: string;
  sprintId?: string;
  projectId: string;

  //
  // Here be associations!
  //

  assign?: UserInstance[];
  reviewers?: UserInstance[];
  labels?: LabelInstance[];
  sprint?: SprintInstance;
  project?: ProjectInstance;
  comments?: CommentInstance[];
}

export interface TaskInstance extends Sequelize.Instance<TaskAttributes>, TaskAttributes {
  addAssign: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], TaskUserAssignAttributes>;
  addReviewer: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], TaskUserReviewerAttributes>;
  removeAssign: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserAttributes['id']>;
  removeReviewer: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserAttributes['id']>;
  getLabels: Sequelize.BelongsToManyGetAssociationsMixin<LabelInstance>;
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
    sprintId: {
      type: DataTypes.UUID,
      references: {
        model: 'sprints',
        key: 'id'
      },
      field: 'sprint_id',
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    projectId: {
      type: DataTypes.UUID,
      references: {
        model: 'projects',
        key: 'id'
      },
      field: 'project_id',
      allowNull: false,
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
    state: {
      type: DataTypes.ENUM(['To do', 'In progress', 'To review / test', 'Done']),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM(['Idea', 'Task', 'Bug', 'Improvement'])
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    points: {
      type: DataTypes.INTEGER
    },
    priority: {
      type: DataTypes.ENUM(['High', 'Normal', 'Low'])
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
    Task.belongsTo(models.Sprint, { as: 'sprint', foreignKey: 'sprintId' });
    Task.hasMany(models.Comment, { as: 'comments', foreignKey: 'taskId' });
    Task.belongsTo(models.Project, { as: 'project', foreignKey: 'projectId' });
    Task.belongsToMany(models.User, { through: 'taskUserAssign', as: 'assign', foreignKey: 'task_id' });
    Task.belongsToMany(models.User, { through: 'taskUserReviewer', as: 'reviewers', foreignKey: 'task_id' });
    Task.belongsToMany(models.Label, { through: 'taskLabel', as: 'labels', foreignKey: 'task_id' });

  };

  return Task;
};
