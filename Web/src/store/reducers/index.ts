import { combineReducers } from 'redux';
import { AppState } from 'models/types/store';
import userReducer from './user/userReducer';
import applicationReducer from './application/applicationReducer';
import projectReducer from './project/projectReducer';

const reducers = combineReducers<AppState>({
  app: applicationReducer,
  user: userReducer,
  project: projectReducer,
});

export { reducers };
