import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';

export interface SprintEntryUserAssignAttributes {
  sprintEntryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SprintEntryUserAssignInstance extends Sequelize.Instance<SprintEntryUserAssignAttributes>, SprintEntryUserAssignAttributes { }

export const SprintEntryUserAssignFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<SprintEntryUserAssignInstance, SprintEntryUserAssignAttributes> => {
  const attributes: SequelizeAttributes<SprintEntryUserAssignAttributes> = {
    sprintEntryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      references: {
        model: 'sprintEntries',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'sprint_entry_id'
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

  const SprintEntryUserAssign = sequelize.define<SprintEntryUserAssignInstance, SprintEntryUserAssignAttributes>('sprintEntryUserAssign', attributes);

  return SprintEntryUserAssign;
};
