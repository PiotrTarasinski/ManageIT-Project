import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes, UserInstance } from './User';
import { LabelInstance } from './Label';
import { SprintEntryUserAssignAttributes } from './SprintEntryUserAssign';
import { SprintEntryUserReviewerAttributes } from './SprintEntryUserReviewer';
import { SprintInstance } from './Sprint';
import { ProjectInstance } from './Project';
import { CommentInstance } from './Comment';

export interface SprintEntryAttributes {
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

export interface SprintEntryInstance extends Sequelize.Instance<SprintEntryAttributes>, SprintEntryAttributes {
  addAssign: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], SprintEntryUserAssignAttributes>;
  addReviewer: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], SprintEntryUserReviewerAttributes>;
  removeAssign: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserAttributes['id']>;
  removeReviewer: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserAttributes['id']>;
  getLabels: Sequelize.BelongsToManyGetAssociationsMixin<LabelInstance>;
}

export const SprintEntryFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
): Sequelize.Model<SprintEntryInstance, SprintEntryAttributes> => {
  const attributes: SequelizeAttributes<SprintEntryAttributes> = {
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

  const SprintEntry = sequelize.define<SprintEntryInstance, SprintEntryAttributes>('sprintEntry', attributes);

  SprintEntry.associate = models => {
    SprintEntry.belongsTo(models.Sprint, { as: 'sprint', foreignKey: 'sprintId' });
    SprintEntry.hasMany(models.Comment, { as: 'comments', foreignKey: 'sprintEntryId' });
    SprintEntry.belongsTo(models.Project, { as: 'project', foreignKey: 'projectId' });
    SprintEntry.belongsToMany(models.User, { through: 'sprintEntryUserAssign', as: 'assign', foreignKey: 'sprint_entry_id' });
    SprintEntry.belongsToMany(models.User, { through: 'sprintEntryUserReviewer', as: 'reviewers', foreignKey: 'sprint_entry_id' });
    SprintEntry.belongsToMany(models.Label, { through: 'sprintEntryLabel', as: 'labels', foreignKey: 'sprint_entry_id' });

  };

  return SprintEntry;
};
