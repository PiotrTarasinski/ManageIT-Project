import { Action, SprintState } from 'models/types/store';
import { sprintActionTypes } from 'models/enums/storeActions';

const initialState: SprintState = {
  id: '',
  name: '',
  startDate: new Date(),
  endDate: new Date(),
  description: '',
  taskList: {
    toDoList: [],
    inProgressList: [],
    toReviewList: [],
    doneList: [],
  },
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case sprintActionTypes.SET_SPRINT:
      return { ...state, ...action.payload };

    case sprintActionTypes.UPDATE_TASK_LIST:
      return { ...state, taskList: action.payload };

    case sprintActionTypes.SET_SELECTED_TASK:
      return { ...state, selectedTask: action.payload };

    default:
      return { ...state };
  }
};
