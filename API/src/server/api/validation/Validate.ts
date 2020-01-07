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

  enum: {
    state: [
      'To do', 'In progress', 'To reviev / test', 'Done'
    ],
    type: [
      'Idea', 'Task', 'Improvement', 'Bug'
    ],
    priority: [
      'High', 'Normal', 'Low'
    ],
    userType: [
      'Assign', 'Review'
    ],
    projectState: [
      'Completed', 'In Development', 'Planning', 'Cancelled'
    ]
  },

  projectCreateProject(name: string, state: string) {
    const errorsArray = [
      validators.isString(name, 'name'),
      validators.required(name, 'name'),
      validators.isString(state, 'state'),
      validators.required(state, 'state'),
      validators.includes(state, 'state', this.enum.projectState)
    ];

    return this.makeResponse(errorsArray);
  },

  projectUpdateProject(id: string, name: string, state: string, leadId: string) {
    const errorsArray = [
      validators.isString(id, 'id'),
      validators.required(id, 'id'),
      validators.uuid(id, 'id')
    ];

    if (name) {
      errorsArray.push(
        validators.isString(name, 'name'),
        validators.required(name, 'name')
      );
    }
    if (state) {
      errorsArray.push(
        validators.isString(state, 'state'),
        validators.required(state, 'state'),
        validators.includes(state, 'state', this.enum.projectState)
      );
    }
    if (leadId) {
      errorsArray.push(
        validators.isString(leadId, 'leadId'),
        validators.required(leadId, 'leadId'),
        validators.uuid(leadId, 'leadId')
      );
    }

    return this.makeResponse(errorsArray);
  },

  twoUUID(userId: string, projectId: string) {

    const errorsArray = [
      validators.isString(userId, 'userId'),
      validators.required(userId, 'userId'),
      validators.uuid(userId, 'userId'),
      validators.isString(projectId, 'projectId'),
      validators.required(projectId, 'projectId'),
      validators.uuid(projectId, 'projectId')
    ];

    return this.makeResponse(errorsArray);
  },

  uuid(projectId: string) {
    const errorArray = [
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

  getProjectUsers(projectId: string, order: string, orderBy: string, page: number, rowsPerPage: number, search: string) {
    const errorsArray = [
      validators.isString(order, 'order'),
      validators.required(order, 'orderBy'),
      validators.isString(orderBy, 'orderBy'),
      validators.required(orderBy, 'orderBy'),
      validators.isNumber(page, 'page'),
      validators.isNumber(rowsPerPage, 'rowsPerPage'),
      validators.required(rowsPerPage, 'rowsPerPage'),
      validators.isString(search, 'search'),
      validators.isString(projectId, 'projectId'),
      validators.required(projectId, 'projectId'),
      validators.uuid(projectId, 'projectId')
    ];

    return this.makeResponse(errorsArray);
  },

  sprintDeleteEntry(id: string) {
    const errorsArray = [
      validators.isString(id, 'id'),
      validators.required(id, 'id'),
      validators.uuid(id, 'id')
    ];

    return this.makeResponse(errorsArray);
  },

  sprintAddComment(id: string, content: string) {
    const errorsArray = [
      validators.isString(id, 'id'),
      validators.required(id, 'id'),
      validators.uuid(id, 'id'),
      validators.isString(content, 'content')
    ];

    return this.makeResponse(errorsArray);
  },

  // tslint:disable-next-line:max-line-length
  sprintCreateEntry(points: string, priority: string, state: string, type: string, title: string, description: string, projectId: string, projectName: string) {
    const errorsArray = [
      validators.isNumber(points, 'points'),
      validators.isString(priority, 'priority'),
      validators.includes(priority, 'priority', this.enum.priority),
      validators.isString(state, 'state'),
      validators.includes(state, 'state', this.enum.state),
      validators.isString(type, 'type'),
      validators.includes(type, 'type', this.enum.type),
      validators.isString(title, 'title'),
      validators.isString(projectId, 'projectId'),
      validators.required(projectId, 'projectId'),
      validators.uuid(projectId, 'projectId'),
      validators.isString(projectName, 'projectName')
    ];
    if (description) {
      errorsArray.concat(
        [
          validators.isString(description, 'description')
        ]
      );
    }
    return this.makeResponse(errorsArray);
  },

  sprintAddEntry(id: string, sprintId: string) {
    const errorsArray = [
      validators.isString(id, 'id'),
      validators.required(id, 'id'),
      validators.uuid(id, 'id'),
      validators.isString(sprintId, 'sprintId'),
      validators.required(sprintId, 'sprintId'),
      validators.uuid(sprintId, 'sprintId')
    ];

    return this.makeResponse(errorsArray);
  },

  sprintUpdateEntry(id: string, points: string, priority: string, type: string, title: string, description: string) {
    const errorsArray = [
      validators.isNumber(points, 'points'),
      validators.isString(priority, 'priority'),
      validators.includes(priority, 'priority', this.enum.priority),
      validators.isString(type, 'type'),
      validators.includes(type, 'type', this.enum.type),
      validators.isString(title, 'title'),
      validators.isString(id, 'sprintId'),
      validators.required(id, 'sprintId'),
      validators.uuid(id, 'sprintId')
    ];
    if (description) {
      errorsArray.concat(
        [
          validators.isString(description, 'description')
        ]
      );
    }

    return this.makeResponse(errorsArray);
  },

  sprintAddEntryUser(id: string, userId: string, type: string) {
    const errorsArray = [
      validators.isString(id, 'id'),
      validators.uuid(id, 'id'),
      validators.isString(userId, 'userId'),
      validators.uuid(userId, 'userId'),
      validators.includes(type, 'type', this.enum.userType),
      validators.isString(type, 'type')
    ];

    return this.makeResponse(errorsArray);
  },

  sprintChangeEntryType(sprintId: string, entryId: string, indexFrom: string, indexTo: string, typeFrom: string, typeTo: string) {
    const errorArray = [
      validators.isString(sprintId, 'sprintId'),
      validators.required(sprintId, 'sprintId'),
      validators.uuid(sprintId, 'sprintId'),
      validators.isString(entryId, 'entryId'),
      validators.uuid(entryId, 'entryId'),
      validators.isNumber(indexFrom, 'indexFrom'),
      validators.isNumber(indexTo, 'indexTo'),
      validators.required(typeFrom, 'typeFrom'),
      validators.isString(typeFrom, 'typeFrom'),
      validators.required(typeTo, 'typeTo'),
      validators.isString(typeTo, 'typeTo')
    ];

    return this.makeResponse(errorArray);
  },

  getSprintEntries(id: string, key: string) {
    const errorArray = [
      validators.isString(id, key),
      validators.required(id, key),
      validators.uuid(id, key)
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

  makeResponse(array: ({ key: string, message: string } | null)[]) {
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
