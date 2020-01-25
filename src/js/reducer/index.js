import { combineReducers } from 'redux';
import global from './global';
import list from './list';
import load from './load';
import detail from './detail';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  global,
  list,
  load,
  detail,
});

export function* rootSaga() {
  // yield all([searchSaga()]);
}

export default rootReducer;
