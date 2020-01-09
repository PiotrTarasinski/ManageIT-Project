import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserInstance } from './User';
import { UserProjectAttributes, UserProjectInstance } from './UserProject';
import { SprintInstance } from './Sprint';
import { SprintEntryInstance } from './SprintEntry';
import { BacklogInstance } from './Backlog';

export interface ProjectAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  state: string;
  leadId?: string;
  activeSprintId?: string;

  //
  // Here be associations!
  //

  lead?: UserInstance;
  users?: UserInstance[];
  usersProjects?: UserProjectInstance;
  activeSprint?: SprintInstance;
  entries?: SprintEntryInstance[];
  projectLogs?: BacklogInstance[];
}

export interface ProjectInstance extends Sequelize.Instance<ProjectAttributes>, ProjectAttributes {
  getEntries: Sequelize.HasManyGetAssociationsMixin<SprintEntryInstance>;
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
    state: {
      type: DataTypes.ENUM(['Completed', 'In Development', 'Planning', 'Cancelled'])
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
    Project.hasMany(models.SprintEntry, { as: 'entries', foreignKey: 'projectId' });
    Project.hasMany(models.Backlog, { as: 'projectLogs', foreignKey: 'projectId' });
    Project.hasMany(models.UserProjectLabel, { foreignKey: 'projectId' });
  };

  return Project;
};
