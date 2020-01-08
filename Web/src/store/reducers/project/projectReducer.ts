import { Action, ProjectState } from 'models/types/store';
import { projectActionTypes } from 'models/enums/storeActions';

const initialState: ProjectState = {
  projectList: [],
  projectListCount: 0,
  projectMemberList: [],
  projectMemberCount: 0,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case projectActionTypes.SET_PROJECT_LIST:
      return { ...state, ...action.payload };

    case projectActionTypes.SET_PROJECT_MEMBER_LIST:
      return { ...state, ...action.payload };

    default:
      return { ...state };
  }
};
