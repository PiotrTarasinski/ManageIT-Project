import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserInstance } from './User';
import { UserProjectAttributes, UserProjectInstance } from './UserProject';
import { SprintInstance } from './Sprint';
import { TaskInstance } from './Task';
import { BacklogInstance } from './Backlog';
import { RoleLabelInstance } from './RoleLabel';
import { LabelInstance } from './Label';

export interface ProjectAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  state?: string;
  identifier: string;
  leadId?: string;
  activeSprintId?: string;

  //
  // Here be associations!
  //

  lead?: UserInstance;
  users?: UserInstance[];
  usersProjects?: UserProjectInstance;
  activeSprint?: SprintInstance;
  tasks?: TaskInstance[];
  projectLogs?: BacklogInstance[];
  projectRoles?: RoleLabelInstance[];
  projectLabels?: LabelInstance[];
}

export interface ProjectInstance extends Sequelize.Instance<ProjectAttributes>, ProjectAttributes {
  getTasks: Sequelize.HasManyGetAssociationsMixin<TaskInstance>;
  addUser: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], UserProjectAttributes>;
  getUsers: Sequelize.BelongsToManyGetAssociationsMixin<UserInstance>;
}

export const ProjectFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<ProjectInstance, ProjectAttributes> => {
  const attributes: SequelizeAttributes<ProjectAttributes> = {
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
    name: {
      type: DataTypes.STRING
    },
    identifier: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.ENUM(['Completed', 'In Development', 'Planning', 'Cancelled']),
      defaultValue: 'Planning'
    },
    activeSprintId: {
      type: DataTypes.UUID,
      references: {
        model: 'sprints',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: true,
      field: 'active_sprint_id'
    },
    leadId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'lead_id'
    }
  };

  const Project = sequelize.define<ProjectInstance, ProjectAttributes>('project', attributes);

  Project.associate = models => {
    Project.hasOne(models.User, { as: 'activeUser', foreignKey: 'activeProjectId' });
    Project.belongsTo(models.User, { as: 'lead', foreignKey: 'leadId', constraints: false });
    Project.belongsToMany(models.User, {
      through: 'usersProjects',
      as: 'users',
      foreignKey: 'projectId'
    });
    Project.hasMany(models.UserProject, { as: 'projectsUsers', foreignKey: 'projectId' });
    Project.belongsTo(models.Sprint, { as: 'activeSprint', foreignKey: 'activeSprintId' });
    Project.hasMany(models.Task, { as: 'tasks', foreignKey: 'projectId' });
    Project.hasMany(models.Backlog, { as: 'projectLogs', foreignKey: 'projectId' });
    Project.hasMany(models.UserProjectLabel, { foreignKey: 'projectId' });
    Project.hasMany(models.RoleLabel, { as: 'projectRoles', foreignKey: 'projectId' });
    Project.hasMany(models.Label, { as: 'projectLabels', foreignKey: 'projectId' });
  };

  return Project;
};
