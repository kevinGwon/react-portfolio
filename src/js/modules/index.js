import { combineReducers } from 'redux';
import list from './list';
import load from './load';

const rootReducer = combineReducers({
  load,
  list,
});

export default rootReducer;
