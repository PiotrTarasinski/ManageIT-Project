import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes } from './User';
import { UserProjectAttributes } from './UserProject';
import { SprintEntryAttributes, SprintEntryInstance } from './SprintEntry';
import { ProjectAttributes } from './Project';

export interface SprintAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  description: string;
  start: Date;
  end: Date;
  /**
   * Associations
   */
  sprintEntries?: SprintEntryAttributes[];
  project?: ProjectAttributes;
}

export interface SprintInstance extends Sequelize.Instance<SprintAttributes>, SprintAttributes {
  getSprintEntries: Sequelize.HasManyGetAssociationsMixin<SprintEntryInstance>;
  addSprintEntry: Sequelize.HasManyAddAssociationMixin<SprintEntryInstance, SprintEntryAttributes['id']>;
}

export const SprintFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<SprintInstance, SprintAttributes> => {
  const attributes: SequelizeAttributes<SprintAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    start: {
      type: DataTypes.DATE
    },
    end: {
      type: DataTypes.DATE
    }
  };

  const Sprint = sequelize.define<SprintInstance, SprintAttributes>('sprint', attributes);

  Sprint.associate = models => {
    Sprint.hasMany(models.SprintEntry, { as: 'sprintEntries', foreignKey: 'sprintId' });
    Sprint.hasOne(models.Project, { as: 'project', foreignKey: 'activeSprintId' });
  };

  return Sprint;
};
