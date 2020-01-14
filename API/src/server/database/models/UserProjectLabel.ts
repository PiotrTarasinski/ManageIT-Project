import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { RoleLabelInstance } from './RoleLabel';

export interface UserProjectLabelAttributes {
  roleLabelId: string;
  userId: string;
  projectId: string;
  createdAt?: Date;
  updatedAt?: Date;

  roleLabels?: RoleLabelInstance;
}

export interface UserProjectLabelInstance extends Sequelize.Instance<UserProjectLabelAttributes>, UserProjectLabelAttributes {
}

export const UserProjectLabelFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserProjectLabelInstance, UserProjectLabelAttributes> => {
  const attributes: SequelizeAttributes<UserProjectLabelAttributes> = {
    roleLabelId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'roleLabels',
        key: 'id'
      },
      field: 'role_label_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    projectId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'id'
      },
      field: 'project_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id',
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
    }
  };

  const UserProjectLabel = sequelize.define<UserProjectLabelInstance, UserProjectLabelAttributes>('usersProjectsLabels', attributes);

  UserProjectLabel.associate = models => {
    UserProjectLabel.belongsTo(models.User, { foreignKey: 'projectId' });
    UserProjectLabel.belongsTo(models.Project, { foreignKey: 'userId' });
    UserProjectLabel.belongsTo(models.RoleLabel, { as: 'roleLabels', foreignKey: 'roleLabelId' });
  };

  return UserProjectLabel;
};
