// API
import { koficDATA, kmdbDATA } from '../modules/asyncAPI';

// action
import { ALL_RESET } from './list';

export const LOADING = 'load/LOADING';
export const LOADING_OUT = 'load/LOADING_OUT';
export const DAILY = 'load/DAILY';
export const WEEK = 'load/WEEK';
export const SEARCH_TEXT = 'load/SEARCH_TEXT';

const initState = {
  daily: true,
  loading: false,
  searchText: '',
};

export const onDaily = () => dispatch => {
  dispatch({
    type: ALL_RESET,
  });
  dispatch({
    type: LOADING_OUT,
  });
  dispatch({
    type: DAILY,
  });
  dispatch(koficDATA());
};

export const onWeek = () => dispatch => {
  dispatch({
    type: ALL_RESET,
  });
  dispatch({
    type: LOADING_OUT,
  });
  dispatch({
    type: WEEK,
  });
  dispatch(koficDATA());
};

export const onSearch = searchText => dispatch => {
  dispatch({
    type: ALL_RESET,
  });
  dispatch({
    type: LOADING,
  });
  dispatch({
    type: SEARCH_TEXT,
    searchText: searchText,
  });
  dispatch(kmdbDATA());
};

export default function load(state = initState, action) {
  switch (action.type) {
    case 'load/LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'load/LOADING_OUT':
      return {
        ...state,
        loading: false,
      };
    case 'load/DAILY':
      return {
        ...state,
        daily: true,
      };
    case 'load/WEEK':
      return {
        ...state,
        daily: false,
      };
    case 'load/SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText,
      };
    default:
      return state;
  }
}
