import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from './User';
import { SequelizeAttributes } from '../../../typings/SequelizeAttributes';

export interface SessionTokenAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;

  /**
   * Associations
   */
  user?: UserAttributes | UserAttributes['id'];
}

export interface SessionTokenInstance extends Sequelize.Instance<SessionTokenAttributes>, SessionTokenAttributes {
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
}


export const SessionTokenFactory =
  (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes):
    Sequelize.Model<SessionTokenInstance, SessionTokenAttributes> => {

    const attributes: SequelizeAttributes<SessionTokenAttributes> = {
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
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'user_id'
      }
    };

    const SessionToken = sequelize
      .define<SessionTokenInstance, SessionTokenAttributes>('session_token', attributes);

    SessionToken.associate = (models) => {
      SessionToken.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    };

    return SessionToken;
  };
