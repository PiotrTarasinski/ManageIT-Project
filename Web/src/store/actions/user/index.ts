import { userActionTypes } from 'models/enums/storeActions';
import { UserState } from 'models/types/store';

const signIn = (user: UserState) => ({
  type: userActionTypes.USER_SIGNED_IN,
  payload: user,
});

export { signIn };
