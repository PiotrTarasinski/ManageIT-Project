import { Action, SprintState } from 'models/types/store';
import { sprintActionTypes } from 'models/enums/storeActions';

const initialState: SprintState = {
  id: '',
  name: '',
  startDate: new Date(),
  endDate: new Date(),
  description: '',
  taskList: [],
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case sprintActionTypes.SET_SPRINT:
      return { ...state, ...action.payload };

    default:
      return { ...state };
  }
};
