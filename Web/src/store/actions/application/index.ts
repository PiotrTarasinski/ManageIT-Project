import { applicationActionTypes } from 'models/enums/storeActions';
import { INotification } from 'models/types/notification';

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

export { toggleSidebar, displaySnackbar, removeSnackbars };
