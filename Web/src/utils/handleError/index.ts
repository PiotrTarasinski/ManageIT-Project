import { Dispatch } from 'redux';
import { Action } from 'models/types/store';
import { displaySnackbar } from 'store/actions/application';
import { FORM_ERROR } from 'final-form';

const handleError = (err: any) => (dispatch: Dispatch<Action>) => {
  if (!err.response) {
    dispatch(displaySnackbar({ text: 'Network Error Occured', variant: 'error' }));
    return null;
  } else if (err.response.data.statusCode === 500) {
    dispatch(displaySnackbar({ text: 'Server Error Occurred', variant: 'error' }));
    return null;
  } else {
    let errors = err.response.data.errors;
    if (errors.formError) {
      errors[FORM_ERROR] = errors.formError;
      delete errors.formError;
    }
    return errors;
  }
};

export { handleError };
