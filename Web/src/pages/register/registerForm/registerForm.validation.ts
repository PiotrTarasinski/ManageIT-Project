import { IRegisterForm } from 'models/types/forms';
import { validators } from 'models/validators';

export const validate = (values: IRegisterForm) => {
  const { name, email, password, confirmPassword } = values;
  const errors: any = {};

  if (!name) {
    errors.name = 'Name is required!';
  }
  if (!email) {
    errors.email = 'Email is required!';
  }
  if (email && !validators.isValidEmail(email)) {
    errors.email = 'Invalid email!';
  }
  if (!password) {
    errors.password = 'Password is required!';
  }
  if (password && validators.isLengthBetween(password, 6, 24)) {
    errors.password = 'Password must be 6-24 characters!';
  }
  if (password && !errors.password && !validators.isContainLowercase(password)) {
    errors.password = 'Password must contain at least 1 lowercase character';
  }
  if (password && !errors.password && !validators.isContainUppercase(password)) {
    errors.password = 'Password must contain at least 1 uppercase character';
  }
  if (password && !errors.password && !validators.isContainNumber(password)) {
    errors.password = 'Password must contain at least 1 number';
  }
  if (password && !errors.password && !validators.isContainSpecialCharacter(password)) {
    errors.password = 'Password must contain at least 1 special character';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm your password!';
  }
  if (password && !errors.password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = "Passwords doesn't match!";
  }

  return errors;
};
