import * as Joi from 'joi';
import { app } from '../../../../../config';

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

        return passwordPolicyFulfilled(value)
          ? value
          : this.createError(
            'passwordPolicy.notFullFilled',
            { v: value },
            state,
            options
          );
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
