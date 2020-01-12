import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { UserInstance } from './User';
import { TaskAttributes, TaskInstance } from './Task';
import { ProjectInstance } from './Project';
import { TaskSprintInstance } from './TaskSprint';

export interface SprintAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  description: string;
  start: Date;
  end: Date;

  //
  // Here be associations!
  //

  taskList?: TaskSprintInstance[];
  project?: ProjectInstance;
  users?: UserInstance[];
}

export interface SprintInstance extends Sequelize.Instance<SprintAttributes>, SprintAttributes {
  getTask: Sequelize.HasManyGetAssociationsMixin<TaskInstance>;
  addTask: Sequelize.HasManyAddAssociationMixin<TaskInstance, TaskAttributes['id']>;
  getUsers: Sequelize.HasManyGetAssociationsMixin<UserInstance>;
}

export const SprintFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<SprintInstance, SprintAttributes> => {
  const attributes: SequelizeAttributes<SprintAttributes> = {
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
    description: {
      type: DataTypes.STRING
    },
    start: {
      type: DataTypes.DATE
    },
    end: {
      type: DataTypes.DATE
    }
  };

  const Sprint = sequelize.define<SprintInstance, SprintAttributes>('sprint', attributes);

  Sprint.associate = models => {
    Sprint.hasMany(models.TaskSprint, { as: 'taskList', foreignKey: 'sprintId' });
    Sprint.hasOne(models.Project, { as: 'project', foreignKey: 'activeSprintId' });
    Sprint.hasMany(models.User, { as: 'users', foreignKey: 'activeSprintId' });
  };

  return Sprint;
};
