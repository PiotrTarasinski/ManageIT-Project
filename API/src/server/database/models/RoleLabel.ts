import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { SprintEntryInstance } from './SprintEntry';
import { ProjectInstance } from './Project';

export interface RoleLabelAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  color: string;
  // projectId: string;

  //
  // Here be associations!
  //

  sprintEntriesIn?: SprintEntryInstance[];
  project?: ProjectInstance;
}

export interface RoleLabelInstance extends Sequelize.Instance<RoleLabelAttributes>, RoleLabelAttributes {}

export const RoleLabelFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<RoleLabelInstance, RoleLabelAttributes> => {
  const attributes: SequelizeAttributes<RoleLabelAttributes> = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    // projectId: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: 'projects',
    //     key: 'id'
    //   },
    //   field: 'sprint_id',
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // },
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
    color: {
      type: DataTypes.STRING
    }
  };

  const RoleLabel = sequelize.define<RoleLabelInstance, RoleLabelAttributes>('roleLabel', attributes);

  RoleLabel.associate = models => {
    // RoleLabel.belongsTo(models.Project, { as: 'project', foreignKey: 'projectId' });
    RoleLabel.hasMany(models.UserProjectLabel, { foreignKey: 'roleLabelId' });
  };

  return RoleLabel;
};
