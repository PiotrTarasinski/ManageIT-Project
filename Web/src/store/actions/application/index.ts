import { applicationActionTypes } from 'models/enums/storeActions';
import { INotification } from 'models/types/notification';
import { ITask } from 'models/types/task';

const toggleSidebar = (sidebarVisible: boolean) => ({
  type: applicationActionTypes.TOGGLE_SIDEBAR,
  payload: { sidebarVisible },
});

const displaySnackbar = (snackbar: INotification) => ({
  type: applicationActionTypes.DISPLAY_SNACKBARS,
  payload: { snackbar },
});

const removeSnackbars = () => ({
  type: applicationActionTypes.REMOVE_SNACKBARS,
});

const setSelectedTask = (task: ITask) => ({
  type: applicationActionTypes.SET_SELECTED_TASK,
  payload: task,
});

export { toggleSidebar, displaySnackbar, removeSnackbars, setSelectedTask };
