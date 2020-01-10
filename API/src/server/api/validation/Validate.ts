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

const enums = {
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
};

const makeResponse = (array: ({ key: string, message: string } | null)[]) => {
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
};

//
// Shared
//

export const uuid = (id: string, key: string) => {
  const errorArray = [
    validators.isString(id, key),
    validators.required(id, key),
    validators.uuid(id, key)
  ];

  return makeResponse(errorArray);
};

export const twoUUID = (firstId: string, secondId: string, firstKey: string, secondKey: string) => {

  const errorsArray = [
    validators.isString(firstId, firstKey),
    validators.required(firstId, firstKey),
    validators.uuid(firstId, firstKey),
    validators.isString(secondId, secondKey),
    validators.required(secondId, secondKey),
    validators.uuid(secondId, secondKey)
  ];

  return makeResponse(errorsArray);
};

const uuidPolicy = (id: string, key: string) => [
  validators.isString(id, key),
  validators.required(id, key),
  validators.uuid(id, key)
];

const stringPolicy = (name: string, key: string) => [
  validators.isString(name, key),
  validators.required(name, key)
];

const enumPolicy = (type: string, key: string, enumArray: string[]) => [
  validators.isString(type, key),
  validators.required(type, key),
  validators.includes(type, key, enumArray)
];

const numberPolicy = (num: number, key: string) => [
  validators.isNumber(num, key),
  validators.required(num, key)
];

//
// Auth
//

const passwordPolicy = (password: string) => [
  validators.lengthMax(password, 'password', 24),
  validators.lengthMin(password, 'password', 6),
  validators.containsLowercase(password, 'password'),
  validators.containsUppercase(password, 'password'),
  validators.containsSpecialChar(password, 'password'),
  validators.containsNumber(password, 'password'),
  validators.isString(password, 'password'),
  validators.required(password, 'password')
];

const namePolicy = (name: string) => {
  return [
    validators.lengthMin(name, 'name', 1),
    validators.isString(name, 'name'),
    validators.required(name, 'name')
  ];
};

const emailPolicy = (email: string) => {
  return [
    validators.isEmail(email, 'email'),
    validators.required(email, 'email')
  ];
};

export const signUp = (payload: SignUp) => {

  const { email, name, password, confirmPassword } = payload;

  const array = [
    validators.ref(confirmPassword, 'confirmPassword', payload.password, 'password')
  ]
    .concat(passwordPolicy(password))
    .concat(namePolicy(name))
    .concat(emailPolicy(email));

  return makeResponse(array);
};

export const login = (payload: Login) => {

  const { email, password } = payload;

  const array = passwordPolicy(password)
    .concat(emailPolicy(email));

  return makeResponse(array);

};

//
// Project
//

export const projectCreate = (name: string, state: string) => {
  const errorsArray = stringPolicy(name, 'name')
  .concat(enumPolicy(state, 'state', enums.projectState));

  return makeResponse(errorsArray);
};

export const projectUpdate = (projectId: string, name: string, state: string, leadId: string) => {
  const errorsArray = uuidPolicy(projectId, 'projectId')
  .concat(stringPolicy(name, 'name'), enumPolicy(state, 'state', enums.projectState), uuidPolicy(leadId, 'leadId'));

  return makeResponse(errorsArray);
};

export const projectGetUsers = (projectId: string, order: string, orderBy: string, page: number, rowsPerPage: number, search: string) => {
  const errorsArray = stringPolicy(order, 'order')
  .concat(stringPolicy(orderBy, 'orderBy'),
  numberPolicy(page, 'page'),
  numberPolicy(rowsPerPage, 'rowsPerPage'),
  uuidPolicy(projectId, 'projectId'),
  [validators.isString(search, 'search')]);

  return makeResponse(errorsArray);
};

//
// User
//

export const userGetProjects = (order: string, orderBy: string, page: number, rowsPerPage: number, search: string) => {
  const errorsArray = stringPolicy(order, 'order')
  .concat(stringPolicy(orderBy, 'orderBy'), numberPolicy(page, 'page'),
  numberPolicy(rowsPerPage, 'rowsPerPage'),
  [validators.isString(search, 'search')]);

  return makeResponse(errorsArray);
};

//
// Sprint
//

export const sprintAddComment = (taskId: string, content: string) => {
  const errorsArray = [
    validators.isString(content, 'content')
  ]
  .concat(uuidPolicy(taskId, 'taskId'));

  return makeResponse(errorsArray);
};

export const sprintUpdateComment = (commentId: string, content: string) => {
  const errorsArray = [
    validators.isString(content, 'content')
  ]
  .concat(uuidPolicy(commentId, 'commentId'));

  return makeResponse(errorsArray);
};


export const sprintChangeTaskState = (sprintId: string, taskId: string, indexFrom: number, indexTo: number, stateFrom: string, stateTo: string) => {
  const errorsArray = uuidPolicy(sprintId, 'sprintId')
  .concat(uuidPolicy(taskId, 'taskId'),
  numberPolicy(indexFrom, 'indexFrom'),
  numberPolicy(indexTo, 'indexTo'),
  enumPolicy(stateFrom, 'stateFrom', enums.state),
  enumPolicy(stateTo, 'stateTo', enums.state));

  return makeResponse(errorsArray);
};



//
// Task
//

export const taskAddUser = (taskId: string, userId: string, type: string) => {
  const errorsArray = [
    validators.isString(taskId, 'taskId'),
    validators.uuid(taskId, 'taskId'),
    validators.isString(userId, 'userId'),
    validators.uuid(userId, 'userId'),
    validators.includes(type, 'type', enums.userType),
    validators.isString(type, 'type')
  ];

  return makeResponse(errorsArray);
};

export const taskCreate = (
  points: number,
  priority: string,
  state: string,
  type: string,
  title: string,
  description: string,
  projectId: string,
  projectName: string
  ) => {

  const errorsArray = numberPolicy(points, 'points')
  .concat(enumPolicy(priority, 'priority', enums.priority),
  enumPolicy(state, 'state', enums.state),
  enumPolicy(type, 'type', enums.type),
  stringPolicy(title, 'title'),
  uuidPolicy(projectId, 'projectId'),
  stringPolicy(projectName, 'projectName'),
  [validators.isString(description, 'description')]
  );

  return makeResponse(errorsArray);
};

export const taskUpdate = (id: string, points: number, priority: string, type: string, title: string, description: string) => {
  const errorsArray = numberPolicy(points, 'points')
  .concat(enumPolicy(priority, 'priority', enums.priority),
  enumPolicy(type, 'type', enums.type),
  uuidPolicy(id, 'sprintId'),
  [validators.isString(title, 'title'), validators.isString(description, 'description')]);

  return makeResponse(errorsArray);
};
