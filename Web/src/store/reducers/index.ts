import { combineReducers } from 'redux';
import { AppState } from 'models/types/store';
import userReducer from './user/userReducer';
import applicationReducer from './application/applicationReducer';

const reducers = combineReducers<AppState>({
  app: applicationReducer,
  user: userReducer,
});

export { reducers };
