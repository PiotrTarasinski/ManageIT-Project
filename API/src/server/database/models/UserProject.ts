import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { ProjectAttributes } from './Project';

export interface UserProjectAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  projectId: string;
  userId: string;
}

export interface UserProjectInstance extends Sequelize.Instance<UserProjectAttributes>, UserProjectAttributes {}

export const UserProjectFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserProjectInstance, UserProjectAttributes> => {
  const attributes: SequelizeAttributes<UserProjectAttributes> = {
    projectId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'id'
      },
      field: 'project_id',
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
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

  const UserProject = sequelize.define<UserProjectInstance, UserProjectAttributes>('user', attributes);

  UserProject.associate = models => {
    UserProject.hasMany(models.User, { foreignKey: 'user_id', constraints: false});
    UserProject.hasMany(models.Project, { foreignKey: 'project_id', constraints: false});
  };

  return UserProject;
};
