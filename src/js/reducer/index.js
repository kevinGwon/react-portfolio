import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import global from './global';
import list from './list';
import load from './load';
import detail from './detail';
import { searchSaga } from './global';

const rootReducer = combineReducers({
  global,
  list,
  load,
  detail,
});

export function* rootSaga() {
  yield all([searchSaga()]);
}

export default rootReducer;
