import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes, UserInstance } from './User';
import { ProjectInstance } from './Project';

export interface BacklogAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  projectId: string;
  content: string;
  userId: string;

  //
  // Here be associations!
  //

  project?: ProjectInstance;
  user?: UserInstance;
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
    content: {
      type: DataTypes.STRING
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
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
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

  const Backlog = sequelize.define<BacklogInstance, BacklogAttributes>('backlog', attributes);


  Backlog.associate = models => {
    Backlog.belongsTo(models.Project, { as: 'project', foreignKey: 'projectId' });
    Backlog.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Backlog;
};
