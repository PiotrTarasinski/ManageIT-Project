import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { SprintEntryInstance } from './SprintEntry';
import { LabelInstance } from './Label';

export interface SprintEntryLabelAttributes {
  sprintEntryId: string;
  labelId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SprintEntryLabelInstance extends Sequelize.Instance<SprintEntryLabelAttributes>, SprintEntryLabelAttributes { }

export const SprintEntryLabelFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<SprintEntryLabelInstance, SprintEntryLabelAttributes> => {
  const attributes: SequelizeAttributes<SprintEntryLabelAttributes> = {
    sprintEntryId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'sprintEntries',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'sprint_entry_id'
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

  const SprintEntryLabel = sequelize.define<SprintEntryLabelInstance, SprintEntryLabelAttributes>('sprintEntryLabel', attributes);


  return SprintEntryLabel;
};
