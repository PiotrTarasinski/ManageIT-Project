import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { ProjectInstance } from './Project';
import { TaskInstance } from './Task';
import { SprintInstance } from './Sprint';
import { UserProjectInstance } from './UserProject';
import { BacklogInstance } from './Backlog';
import { UserProjectLabelInstance } from './UserProjectLabel';

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
  activeSprintId?: string;

  //
  // Here be associations!
  //

  leadIn?: ProjectInstance[];
  projectsIn?: ProjectInstance[];
  assignIn?: TaskInstance[];
  reviewerIn?: TaskInstance[];
  activeProject?: ProjectInstance[];
  activeSprint?: SprintInstance[];
  usersProjects?: UserProjectInstance;
  logs?: BacklogInstance[];
  usersProjectsLabels?: UserProjectLabelInstance[];
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  setActiveProject: Sequelize.BelongsToSetAssociationMixin<ProjectInstance, ProjectInstance['id']>;
  setActiveSprint: Sequelize.BelongsToSetAssociationMixin<SprintInstance, SprintInstance['id']>;
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
        field: 'active_project_id',
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      activeSprintId: {
        type: DataTypes.STRING,
        references: {
          model: 'sprints',
          key: 'id'
        },
        allowNull: true,
        field: 'active_sprint_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }
    };

    const User = sequelize
      .define<UserInstance, UserAttributes>('user', attributes);

    User.associate = (models) => {
      User.hasMany(models.Comment, { as: 'comments', foreignKey: 'userId' });
      User.belongsTo(models.Project, { as: 'activeProject', foreignKey: 'activeProjectId' });
      User.belongsTo(models.Sprint, { as: 'activeSprint', foreignKey: 'activeSprintId' });
      User.hasMany(models.Project, { as: 'leadIn', foreignKey: 'leadId', constraints: false });
      User.belongsToMany(models.Project, { through: 'usersProjects', as: 'projectsIn', foreignKey: 'userId' });
      User.belongsToMany(models.TaskSprint, { through: 'taskUserReviewer', as: 'reviewerIn', foreignKey: 'user_id' });
      User.belongsToMany(models.TaskSprint, { through: 'taskUserAssign', as: 'assignIn', foreignKey: 'user_id' });
      User.hasMany(models.UserProject, { as: 'permissions', foreignKey: 'userId' });
      User.hasMany(models.UserProjectLabel, { foreignKey: 'userId' });
      User.hasMany(models.Backlog, { as: 'userLogs', foreignKey: 'userId' });
    };

    return User;
  };
