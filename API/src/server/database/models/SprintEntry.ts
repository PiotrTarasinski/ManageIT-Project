import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes, UserInstance } from './User';
import { LabelAttributes } from './Label';
import { SprintEntryUserAssignAttributes } from './SprintEntryUserAssign';

export interface SprintEntryAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  identifier: string;
  index: string;
  points: string;
  priority: string;
  state: string;
  type: string;
  title: string;
  description?: string;
  sprintId: string;
    /**
     * Associations
     */
  assign?: UserAttributes[];
  reviewers?: UserAttributes[];
  labels?: LabelAttributes[];
}

export interface SprintEntryInstance extends Sequelize.Instance<SprintEntryAttributes>, SprintEntryAttributes {
  addUser: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], SprintEntryUserAssignAttributes>;
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
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'sprints',
        key: 'id'
      },
      field: 'sprint_id',
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
      type: DataTypes.ENUM(['TO_DO', 'IN_PROGRESS', 'TO_REVIEW_AND_TEST', 'DONE'])
    },
    type: {
      type: DataTypes.ENUM(['IDEA', 'TASK', 'BUG', 'IMPROVEMENT'])
    },
    index: {
      type: DataTypes.INTEGER
    },
    points: {
      type: DataTypes.INTEGER
    },
    priority: {
      type: DataTypes.ENUM(['HIGH', 'NORMAL', 'LOW'])
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
    SprintEntry.belongsToMany(models.User, { through: 'sprintEntryUserAssign', as: 'assign', foreignKey: 'sprint_entry_id' });
    SprintEntry.belongsToMany(models.User, { through: 'sprintEntryUserReviewer', as: 'reviewers', foreignKey: 'sprint_entry_id' });
    SprintEntry.belongsToMany(models.Label, { through: 'sprintEntryLabel', as: 'labels', foreignKey: 'sprint_entry_id' });

  };

  return SprintEntry;
};
