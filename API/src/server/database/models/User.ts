import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { ProjectAttributes, ProjectInstance } from './Project';
import { SprintEntryAttributes } from './SprintEntry';

export type AccountRole = 'admin' | 'user';

export interface UserAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  password: string;
  email: string;
  avatar?: string | null;
  activeProjectId?: string;

  /**
   * Associations
   */
  leadIn?: ProjectAttributes[];
  projectsIn?: ProjectAttributes[];
  assignIn?: SprintEntryAttributes[];
  reviewerIn?: SprintEntryAttributes[];
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  setActiveProject: Sequelize.BelongsToSetAssociationMixin<ProjectInstance, ProjectInstance['id']>;
}

export const UserFactory =
  (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes):
    Sequelize.Model<UserInstance, UserAttributes> => {

    const attributes: SequelizeAttributes<UserAttributes> = {
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
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      avatar: {
        type: DataTypes.STRING
      },
      activeProjectId: {
        type: DataTypes.STRING,
        references: {
          model: 'projects',
          key: 'id'
        },
        field: 'active_project_id'
      }
    };

    const User = sequelize
      .define<UserInstance, UserAttributes>('user', attributes);

    User.associate = (models) => {
      User.hasMany(models.Comment, { as: 'comments', foreignKey: 'userId' });
      User.belongsTo(models.Project, { as: 'activeProject', foreignKey: 'activeProjectId' });
      User.hasMany(models.Project, { as: 'leadIn', foreignKey: 'leadId', constraints: false });
      User.belongsToMany(models.Project, { through: 'usersProjects', as: 'projectsIn', foreignKey: 'userId' });
      User.belongsToMany(models.SprintEntry, { through: 'sprintEntryUserReviewer', as: 'reviewerIn', foreignKey: 'user_id' });
      User.belongsToMany(models.SprintEntry, { through: 'sprintEntryUserAssign', as: 'assignIn', foreignKey: 'user_id' });
    };

    return User;
  };
