import { Dispatch } from 'redux';
import { Action } from 'models/types/store';
import Swal from 'sweetalert2';
import { displaySnackbar } from '../application';

const handleLeaveProject = (id: string, name: string) => (dispatch: Dispatch<Action>) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Please confirm that you want to leave the project`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
  }).then(result => {
    if (result.value) {
      dispatch(displaySnackbar({ text: `Successfully left project ${name}`, variant: 'success' }));
    }
  });
};

const handleDeleteProject = (id: string, name: string) => (dispatch: Dispatch<Action>) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Please confirm that you want to delete the project`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
  }).then(result => {
    if (result.value) {
      dispatch(
        displaySnackbar({ text: `Successfully removed project ${name}`, variant: 'success' }),
      );
    }
  });
};

export { handleLeaveProject, handleDeleteProject };
