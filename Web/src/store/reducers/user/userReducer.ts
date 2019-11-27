import { Action, UserState } from 'models/types/store';
import { userActionTypes } from 'models/enums/storeActions';
import { getUserDataFromToken } from 'utils/getUserDataFromToken';

const initialState: UserState = {
  ...getUserDataFromToken(),
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case userActionTypes.SET_USER_DATA:
      return { ...state, ...action.payload };

    default:
      return { ...state };
  }
};
