import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserAttributes, UserInstance } from './User';
import { UserProjectAttributes, UserProjectInstance } from './UserProject';
import { SprintAttributes } from './Sprint';
import { SprintEntryInstance, SprintEntryAttributes } from './SprintEntry';

export interface ProjectAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  state: string;
  leadId?: string;
  activeSprintId?: string;

  /**
   * Associations
   */
  lead?: UserAttributes;
  users?: UserAttributes[];
  usersProjects?: UserProjectAttributes;
  activeSprint?: SprintAttributes;
  entries?: SprintEntryAttributes[];
}

export interface ProjectInstance extends Sequelize.Instance<ProjectAttributes>, ProjectAttributes {
  getEntries: Sequelize.HasManyGetAssociationsMixin<SprintEntryInstance>;
  addUser: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], UserProjectAttributes>;
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
    Project.belongsTo(models.Sprint, { as: 'activeSprint', foreignKey: 'activeSprintId' });
    Project.hasMany(models.SprintEntry, { as: 'entries', foreignKey: 'projectId' });
  };

  return Project;
};
