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

  addUserToProject(userId: string, projectId: string) {

    const errorArray = [
      validators.isString(userId, 'userId'),
      validators.required(userId, 'userId'),
      validators.uuid(userId, 'userId'),
      validators.isString(projectId, 'projectId'),
      validators.required(projectId, 'projectId'),
      validators.uuid(projectId, 'projectId')
    ];

    return this.makeResponse(errorArray);
  },

  getUserProjects(order: string, orderBy: string, page: number, rowsPerPage: number, search: string) {
    const errorsArray = [
      validators.isString(order, 'order'),
      validators.required(order, 'orderBy'),
      validators.isString(orderBy, 'orderBy'),
      validators.required(orderBy, 'orderBy'),
      validators.isNumber(page, 'page'),
      validators.isNumber(rowsPerPage, 'rowsPerPage'),
      validators.required(rowsPerPage, 'rowsPerPage'),
      validators.isString(search, 'search')
    ];

    return this.makeResponse(errorsArray);
  },

  sprintChangeEntryType(sprintId: string, entryId: string, indexFrom: string, indexTo: string, typeFrom: string, typeTo: string) {
    const errorArray = [
      validators.isString(sprintId, 'sprintId'),
      validators.required(sprintId, 'sprintId'),
      validators.uuid(sprintId, 'sprintId'),
      validators.isString(entryId, 'entryId'),
      validators.required(entryId, 'entryId'),
      validators.uuid(entryId, 'entryId'),
      validators.required(indexFrom, 'indexFrom'),
      validators.isString(indexFrom, 'indexFrom'),
      validators.required(indexTo, 'indexTo'),
      validators.isString(indexTo, 'indexTo'),
      validators.required(typeFrom, 'typeFrom'),
      validators.isString(typeFrom, 'typeFrom'),
      validators.required(typeTo, 'typeTo'),
      validators.isString(typeTo, 'typeTo')
    ];

    return this.makeResponse(errorArray);
  },

  getSprintEntries(id: string) {
    const errorArray = [
      validators.isString(id, 'userId'),
      validators.required(id, 'userId'),
      validators.uuid(id, 'userId')
    ];

    return this.makeResponse(errorArray);
  },

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
