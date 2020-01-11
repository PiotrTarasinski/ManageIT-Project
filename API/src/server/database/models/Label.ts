import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';
import { TaskInstance } from './Task';

export interface LabelAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  color: string;

  //
  // Here be associations!
  //

  tasksIn?: TaskInstance[];
}

export interface LabelInstance extends Sequelize.Instance<LabelAttributes>, LabelAttributes {}

export const LabelFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<LabelInstance, LabelAttributes> => {
  const attributes: SequelizeAttributes<LabelAttributes> = {
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
    color: {
      type: DataTypes.STRING
    }
  };

  const Label = sequelize.define<LabelInstance, LabelAttributes>('label', attributes);

  Label.associate = models => {
    Label.belongsToMany(models.Task, { through: 'taskLabel', as: 'tasksIn', foreignKey: 'label_id' });
  };

  return Label;
};
