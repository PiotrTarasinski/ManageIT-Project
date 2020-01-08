import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes, UserInstance } from './User';
import { ProjectInstance } from './Project';

export interface BacklogAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  projectId: string;
  userId: string;
  action: string;
  message: string;
  eventId?: string;
  type: string;

  //
  // Here be associations!
  //

  user?: UserInstance;
  project?: ProjectInstance;
}

export interface BacklogInstance extends Sequelize.Instance<BacklogAttributes>, BacklogAttributes {
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
}

export const BacklogFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes
): Sequelize.Model<BacklogInstance, BacklogAttributes> => {
  const attributes: SequelizeAttributes<BacklogAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    projectId: {
      type: DataTypes.UUID,
      references: {
        model: 'projects',
        key: 'id'
      },
      field: 'project_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    message: {
      type: DataTypes.STRING
    },
    action: {
      type: DataTypes.STRING
    },
    eventId: {
      type: DataTypes.UUID,
      field: 'event_id'
    },
    type: {
      type: DataTypes.STRING
    }
  };

  const Backlog = sequelize.define<BacklogInstance, BacklogAttributes>('backlog', attributes);


  Backlog.associate = models => {
    Backlog.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    Backlog.belongsTo(models.Project, { as: 'project', foreignKey: 'projectId' });
  };

  return Backlog;
};
