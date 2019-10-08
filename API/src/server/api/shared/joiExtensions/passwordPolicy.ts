import * as Joi from 'joi';
import { app } from '../../../../config';
import ApiError from '../../error/ApiError';
import httpStatus = require('http-status');

const passwordPolicy: Joi.Extension = {
  base: Joi.string().required(),
  name: 'passwordPolicy',
  language: {
    notFullFilled: 'Password policy not fulfilled'
  },
  rules: [
    {
      name: 'matchesPasswordPolicy',
      validate(params: any, value: any, state: Joi.State, options: Joi.ValidationOptions): any {
        if (passwordPolicyFulfilled(value)) {
          return value;
        }
        throw ApiError.boom(null, { message: 'Password policy not fullfilled', statusCode: httpStatus.BAD_REQUEST });
      }
    }
  ]
};

const passwordPolicyFulfilled = (pass: string): boolean => {
  return [
    upperCase(pass),
    lowerCase(pass),
    specialCharacters(pass),
    numbers(pass)
  ].filter(passed => passed)
    .length > 2;
};


const upperCase = (pass: string): boolean => {
  return /[A-Z]/.test(pass);
};

const lowerCase = (pass: string): boolean => {
  return /[a-z]/.test(pass);
};

const specialCharacters = (pass: string): boolean => {
  return app.passwordPolicy.specialCharactersRegExp.test(pass);
};

const numbers = (pass: string): boolean => {
  return /\d/.test(pass);
};

export default Joi.extend(passwordPolicy).passwordPolicy();

export {
  passwordPolicyFulfilled
};
