import { combineReducers } from 'redux';
import global from './global';
import list from './list';
import load from './load';
import detail from './detail';

const rootReducer = combineReducers({
  global,
  list,
  load,
  detail,
});

export default rootReducer;
