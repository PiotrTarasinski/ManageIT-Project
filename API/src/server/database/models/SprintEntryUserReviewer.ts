import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';

export interface SprintEntryUserReviewerAttributes {
  sprintEntryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SprintEntryUserReviewerInstance extends Sequelize.Instance<SprintEntryUserReviewerAttributes>, SprintEntryUserReviewerAttributes { }

export const SprintEntryUserReviewerFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<SprintEntryUserReviewerInstance, SprintEntryUserReviewerAttributes> => {
  const attributes: SequelizeAttributes<SprintEntryUserReviewerAttributes> = {
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
    userId: {
      type: DataTypes.UUID,
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

  // tslint:disable-next-line:max-line-length
  const SprintEntryUserReviewer = sequelize.define<SprintEntryUserReviewerInstance, SprintEntryUserReviewerAttributes>('sprintEntryUserReviewer', attributes);

  return SprintEntryUserReviewer;
};
