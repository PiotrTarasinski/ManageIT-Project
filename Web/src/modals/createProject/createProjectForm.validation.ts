import { validators } from 'models/validators';

export const validate = (values: any) => {
  const { name, identifier } = values;
  const errors: any = {};

  if (!name) {
    errors.name = 'Project name is required!';
  }
  if (name && validators.isLengthBetween(name, 4, 48)) {
    errors.name = 'Project name be 4-48 characters!';
  }
  if (!identifier) {
    errors.identifier = 'Identifier is required!';
  }
  if (identifier && validators.isLengthBetween(identifier, 3, 6)) {
    errors.identifier = 'Identifier must be 3-6 character!';
  }

  return errors;
};
