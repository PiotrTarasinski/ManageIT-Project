import validators from './Validators';
import CustomResponse from '../error/CustomError';

interface SignUp {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface Login {
  email: string;
  password: string;
}

const Validate = {

  passwordPolicy(password: string) {

    return [
      validators.lengthMax(password, 'password', 24),
      validators.lengthMin(password, 'password', 6),
      validators.containsLowercase(password, 'password'),
      validators.containsUppercase(password, 'password'),
      validators.containsSpecialChar(password, 'password'),
      validators.containsNumber(password, 'password'),
      validators.isString(password, 'password'),
      validators.required(password, 'password')
    ];

  },

  namePolicy(name: string) {

    return [
      validators.lengthMin(name, 'name', 1),
      validators.isString(name, 'name'),
      validators.required(name, 'name')
    ];

  },

  emailPolicy(email: string) {

    return [
      validators.isEmail(email, 'email'),
      validators.required(email, 'email')
    ];

  },

  signUp(payload: SignUp) {

    const { email, name, password, confirmPassword } = payload;

    const array = [
      validators.ref(confirmPassword, 'confirmPassword', payload.password, 'password')
    ]
    .concat(this.passwordPolicy(password))
    .concat(this.namePolicy(name))
    .concat(this.emailPolicy(email));

    return this.makeResponse(array);

  },

  login(payload: Login) {

    const { email, password } = payload;

    const array = this.passwordPolicy(password)
    .concat(this.emailPolicy(email));

    return this.makeResponse(array);

  },

  makeResponse(array: ({key: string, message: string} | null)[]) {
    const errObject: { [key: string]: string } = {};
    array.forEach(element => {
      if (element) {
        errObject[element.key] = element.message;
      }
    });
    if (Object.keys(errObject).length === 0) {
      return CustomResponse(200, '');
    }

    return CustomResponse(400, 'Invalid payload input', errObject);
  }
};

export default Validate;