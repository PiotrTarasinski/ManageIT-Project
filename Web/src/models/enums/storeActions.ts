enum defaultActionTypes {
  DEFAULT_ACTION = 'DEFAULT_ACTION',
}

enum userActionTypes {
  SET_USER_DATA = 'SET_USER_DATA',
  USER_LOGOUT = 'USER_LOGOUT',
}

enum applicationActionTypes {
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  DISPLAY_SNACKBARS = 'DISPLAY_SNACKBARS',
  REMOVE_SNACKBARS = 'REMOVE_SNACKBARS',
  SET_SELECTED_TASK = 'SET_SELECTED_TASK',
}

enum projectActionTypes {
  SET_PROJECT_LIST = 'SET_PROJECT_LIST',
  SET_PROJECT_TASK_LIST = 'SET_PROJECT_TASK_LIST',
  SET_PROJECT_MEMBER_LIST = 'SET_PROJECT_MEMBER_LIST',
}

enum sprintActionTypes {
  SET_SPRINT = 'SET_SPRINT',
  UPDATE_TASK_LIST = 'UPDATE_TASK_LIST',
}

export {
  defaultActionTypes,
  userActionTypes,
  applicationActionTypes,
  projectActionTypes,
  sprintActionTypes,
};
