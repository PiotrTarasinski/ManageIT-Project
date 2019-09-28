import Sequelize from 'sequelize';
import { env } from '../../../config';
import { SessionTokenAttributes, SessionTokenFactory, SessionTokenInstance } from './SessionToken';
import { UserAttributes, UserFactory, UserInstance } from './User';
import { logger } from '../../../utils';


export type DbModels = {
  User: Sequelize.Model<UserInstance, UserAttributes>;
  SessionToken: Sequelize.Model<SessionTokenInstance, SessionTokenAttributes>;
};

export interface DbInterface extends DbModels {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
}

export const sequelize = new Sequelize(
  env.DB.DATABASE,
  env.DB.USERNAME,
  env.DB.PASSWORD,
  {
    host: env.DB.HOST,
    port: <number>env.DB.PORT,
    dialect: env.DB.DIALECT,
    logging: (env.NODE_ENV === 'development' && env.DB.FORCE_SUPRESS_LOGS) || env.NODE_ENV === 'production' ? (sql: any) => logger.info(sql) : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    SessionToken: SessionTokenFactory(sequelize, Sequelize)
  };

  Object.values(db).forEach((model) => {
    if (model.associate) {
      model.associate(db);
    }
  });

  return db;
};
