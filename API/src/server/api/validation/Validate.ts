import validators from './Validators';
import CustomResponse from '../error/CustomError';

interface SignUp {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const Validate = {
  signUp(payload: SignUp) {
    const errObject: { [key: string]: string } = {};
    [
      validators.isEmail(payload.email, 'email'),
      validators.required(payload.email, 'email'),

      validators.lengthMin(payload.name, 'name', 1),
      validators.isString(payload.name, 'name'),
      validators.required(payload.name, 'name'),

      validators.lengthMax(payload.password, 'password', 24),
      validators.lengthMin(payload.password, 'password', 6),
      validators.containsLowercase(payload.password, 'password'),
      validators.containsUppercase(payload.password, 'password'),
      validators.containsSpecialChar(payload.password, 'password'),
      validators.containsNumber(payload.password, 'password'),
      validators.isString(payload.password, 'password'),
      validators.required(payload.password, 'password'),

      validators.ref(payload.confirmPassword, 'confirmPassword', payload.password, 'password')
    ].forEach(element => {
      if (element) {
        errObject[element.key] = element.message;
      }
    });

    if (Object.keys(errObject).length === 0) {
        // console.log(errObject);
      return CustomResponse(200, '');
    }
    console.log(errObject);

    return CustomResponse(400, 'Invalid payload input', errObject);
  }
};

export default Validate;
