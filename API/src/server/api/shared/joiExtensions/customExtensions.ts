import * as Joi from '@hapi/joi';

const customJoi = Joi.extend(
  (joi: Joi.Context): Joi.Extension => ({
    base: joi.string().required(),
    name: 'custom',
    language: {
      notFullfilled: 'policy not fullfiled'
    },
    rules: [
      {
        name: 'passwordPolicy',
        validate(params: any, value: any, state: Joi.State, options: Joi.ValidationOptions): any {
          if ([upperCase(value), lowerCase(value), specialCharacters(value), numbers(value)].filter(passed => passed).length > 2) {
            return value;
          }
          return this.createError('custom.notFullfilled', { v: value }, state, options);
        }
      }
    ]
  })
);

const upperCase = (pass: string): boolean => {
  return /[A-Z]/.test(pass);
};

const lowerCase = (pass: string): boolean => {
  return /[a-z]/.test(pass);
};

const specialCharacters = (pass: string): boolean => {
  return /[£!@#\$%\^&\*\(\)_\+§\-=\[\]\{\};':",\.\/<>\?`~]/.test(pass);
};

const numbers = (pass: string): boolean => {
  return /\d/.test(pass);
};

export default customJoi.custom();
