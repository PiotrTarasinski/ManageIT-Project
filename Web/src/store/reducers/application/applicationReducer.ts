import { Action, ApplicationState } from 'models/types/store';
import { applicationActionTypes } from 'models/enums/storeActions';

const initialState: ApplicationState = {
  sidebarVisible: false,
  notifications: [],
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case applicationActionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarVisible: action.payload.sidebarVisible };

    case applicationActionTypes.DISPLAY_SNACKBARS:
      return { ...state, notifications: [...state.notifications, action.payload.snackbar] };

    case applicationActionTypes.REMOVE_SNACKBARS:
      return { ...state, notifications: [] };

    case applicationActionTypes.SET_SELECTED_TASK:
      return { ...state, selectedTask: action.payload };

    default:
      return { ...state };
  }
};
