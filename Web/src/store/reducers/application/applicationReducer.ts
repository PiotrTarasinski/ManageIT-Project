import { Action, ApplicationState } from 'models/types/store';
import { applicationActionTypes } from 'models/enums/storeActions';

const initialState: ApplicationState = {
  sidebarVisible: false,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case applicationActionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarVisible: action.payload.sidebarVisible };

    default:
      return { ...state };
  }
};
