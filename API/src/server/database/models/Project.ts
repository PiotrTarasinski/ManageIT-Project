import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import db from '..';
import { UserAttributes } from './User';

export interface ProjectAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  state: string;
  leadId: string;

  /**
   * Associations
   */
  lead?: UserAttributes;
  users?: UserAttributes[];
}

export interface ProjectInstance extends Sequelize.Instance<ProjectAttributes>, ProjectAttributes {}

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
      type: DataTypes.ENUM(['Completed', 'In development', 'Planning', 'Cancelled'])
    },
    leadId: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      field: 'lead_id'
    }
  };

  const Project = sequelize.define<ProjectInstance, ProjectAttributes>('project', attributes);

  Project.associate = models => {
    Project.belongsTo(models.User, { as: 'lead', foreignKey: 'leadId' });
    Project.belongsToMany(models.User, { through: 'usersProjects', as: 'users', foreignKey: 'project_id' });
  };

  return Project;
};
