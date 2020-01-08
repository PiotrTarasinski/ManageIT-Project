import { userActionTypes } from 'models/enums/storeActions';
import { UserState, Action } from 'models/types/store';
import { API } from 'store/api';
import { Dispatch } from 'redux';
import { getUserDataFromToken } from 'utils/getUserDataFromToken';
import { History } from 'history';
import { ROUTES } from 'models/variables/routes';
import Swal from 'sweetalert2';
import { handleError } from 'utils/handleError';
import { displaySnackbar } from '../application';

const setUserData = (user: UserState) => ({
  type: userActionTypes.SET_USER_DATA,
  payload: user,
});

const handleSignIn = (email: string, password: string, history: History) => (
  dispatch: Dispatch<Action>,
) => {
  return API.user
    .signIn(email, password)
    .then((res: any) => {
      dispatch(setUserData(getUserDataFromToken()));
      dispatch(displaySnackbar({ text: 'Logged In Successfully', variant: 'success' }));
      history.push(ROUTES.projects.pathname);
      return res;
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const handleSignUp = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  history: History,
) => (dispatch: Dispatch<Action>) => {
  return API.user
    .signUp(name, email, password, confirmPassword)
    .then((res: any) => {
      Swal.fire({
        title: 'Success',
        text: 'Now you can login to your account',
        type: 'success',
        confirmButtonText: 'Login',
        timer: 3000,
      }).then(() => {
        history.push(ROUTES.login.pathname);
      });
      return res;
    })
    .catch((err: any) => {
      return handleError(err)(dispatch);
    });
};

const handleLogOut = (history: History) => (dispatch: Dispatch<Action>) => {
  window.localStorage.removeItem('acces_token');
  dispatch(
    setUserData({
      isAuth: false,
      id: undefined,
      email: undefined,
      name: undefined,
      avatar: undefined,
    }),
  );
  history.push(ROUTES.login.pathname);
};

const setActiveProject = (projectId: string, history: History) => (dispatch: Dispatch<Action>) => {
  return API.user
    .setActiveProject(projectId)
    .then((res: any) => {
      history.push(`${ROUTES.dashboard.pathname}/${projectId}`);
    })
    .catch((err: any) => {
      // return handleError(err)(dispatch);
      if (handleError(err)(dispatch)) {
        dispatch(displaySnackbar({ text: 'Something went wrong', variant: 'error' }));
      }
    });
};

export { setUserData, handleSignIn, handleLogOut, handleSignUp, setActiveProject };
