// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

import * as Joi from 'joi';

export type DotEnvConfig = {
  // SERVER
  NODE_ENV: 'development' | 'test' | 'production';
  PORT: string | number;
  SERVER_HOST_NAME: string;
  WEB_APP_URL: string;
  WEB_APP_HASH_ROUTER: boolean;
  APP_DISPLAY_NAME: string;

  // DATABASE
  DB: {
    HOST: string;
    PORT: string | number;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;
    DIALECT: string;
    FORCE_SUPRESS_LOGS: boolean;
  };
};

// define validation for all the env vars
const envVarsSchema = Joi.object({
  // SERVER
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test']),
  PORT: Joi.number(),
  SERVER_HOST_NAME: Joi.string(),
  WEB_APP_URL: Joi.string().required(),
  WEB_APP_HASH_ROUTER: Joi.boolean().default(true),
  APP_DISPLAY_NAME: Joi.string().default('NotesHub'),

  // Database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required().allow(''),
  DB_DATABASE: Joi.string().required(),
  DB_DIALECT: Joi.string().required(),
  DB_FORCE_SUPRESS_LOGS: Joi.boolean().default(false)
}).unknown().required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: DotEnvConfig = {
  NODE_ENV: <'development' | 'test' | 'production'>process.env.NODE_ENV || 'development',
  PORT: envVars.PORT || 4141,
  SERVER_HOST_NAME: envVars.SERVER_HOST_NAME || 'localhost',
  WEB_APP_URL: envVars.WEB_APP_URL || 'localhost',
  WEB_APP_HASH_ROUTER: Boolean(envVars.WEB_APP_HASH_ROUTER),
  APP_DISPLAY_NAME: envVars.APP_DISPLAY_NAME || '',

  DB: {
    HOST: envVars.DB_HOST || '',
    PORT: envVars.DB_PORT || 0,
    USERNAME: envVars.DB_USERNAME || '',
    PASSWORD: envVars.DB_PASSWORD || '',
    DATABASE: envVars.DB_DATABASE || '',
    FORCE_SUPRESS_LOGS: <boolean>(envVars.DB_FORCE_SUPRESS_LOGS || false),
    DIALECT: <string>(envVars.DB_DIALECT || 'mysql')
  }
};

export default config;
