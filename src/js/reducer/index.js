import { combineReducers } from 'redux';
import global from './global';
import list from './list';
import load from './load';

const rootReducer = combineReducers({
  global,
  load,
  list,
});

export default rootReducer;
