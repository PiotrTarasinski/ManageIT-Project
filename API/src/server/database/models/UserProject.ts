import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';

export interface UserProjectAttributes {
  id?: string;
  projectId?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  permissions?: string;
  isAdmin?: boolean;
  isSupervisor?: boolean;
  isModerator?: boolean;
}

export interface UserProjectInstance extends Sequelize.Instance<UserProjectAttributes>, UserProjectAttributes { }

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
      field: 'project_id'
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
    },
    permissions: {
      type: DataTypes.ENUM(['User', 'Admin']),
      defaultValue: 'User'
    }
  };

  const UserProject = sequelize.define<UserProjectInstance, UserProjectAttributes>('usersProjects', attributes);

  UserProject.associate = models => {
    UserProject.belongsTo(models.Project, { as: 'projects', foreignKey: 'projectId' });
    UserProject.belongsTo(models.User, { as: 'users', foreignKey: 'userId' });
  };

  return UserProject;
};
