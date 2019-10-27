import { applicationActionTypes } from 'models/enums/storeActions';

const toggleSidebar = (sidebarVisible: boolean) => ({
  type: applicationActionTypes.TOGGLE_SIDEBAR,
  payload: { sidebarVisible },
});

export { toggleSidebar };
