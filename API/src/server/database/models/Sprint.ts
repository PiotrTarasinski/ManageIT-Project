import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes } from './User';
import { UserProjectAttributes } from './UserProject';
import { SprintEntryAttributes } from './SprintEntry';

export interface SprintAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  /**
   * Associations
   */
  sprintEntries?: SprintEntryAttributes[];
}

export interface SprintInstance extends Sequelize.Instance<SprintAttributes>, SprintAttributes {}

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
    }
  };

  const Sprint = sequelize.define<SprintInstance, SprintAttributes>('sprint', attributes);

  Sprint.associate = models => {
    Sprint.hasMany(models.SprintEntry, { as: 'sprintEntries', foreignKey: 'sprintId' });
  };

  return Sprint;
};
