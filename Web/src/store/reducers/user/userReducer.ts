import { Action, UserState } from 'models/types/store';
import { userActionTypes } from 'models/enums/storeActions';

const initialState: UserState = {
  isAuth: false,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case userActionTypes.USER_SIGNED_IN:
      return { ...state, isAuth: true };

    default:
      return { ...state };
  }
};