import { combineReducers } from 'redux';
import { AppState } from 'models/types/store';
import userReducer from './user/userReducer';

const reducers = combineReducers<AppState>({
  user: userReducer,
});

export { reducers };
