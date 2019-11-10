import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';

export type AccountRole = 'admin' | 'user';

export interface UserAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  password: string;
  email: string;
  avatar?: string | null;

  /**
   * Associations
   */
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {

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
      }
    };

    const User = sequelize
      .define<UserInstance, UserAttributes>('user', attributes);

    return User;
  };
