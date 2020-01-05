// API
import { koficDATA, kmdbDATA } from '../modules/asyncAPI';

// ACTION
import { ALL_RESET } from './list';

export const LOADING = 'load/LOADING';
export const LOADING_OUT = 'load/LOADING_OUT';
export const DAILY = 'load/DAILY';
export const WEEK = 'load/WEEK';
export const SEARCH_TEXT = 'load/SEARCH_TEXT';
export const SEARCH = 'load/SEARCH';
export const SEARCH_OUT = 'load/SEARCH_OUT';

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

const initState = {
  daily: true,
  isLoading: false,
  isSearch: false,
  searchText: '',
};

export default function load(state = initState, action) {
  switch (action.type) {
    case 'load/LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'load/LOADING_OUT':
      return {
        ...state,
        isLoading: false,
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
    case 'load/SEARCH':
      return {
        ...state,
        isSearch: true,
      };
    case 'load/SEARCH_OUT':
      return {
        ...state,
        isSearch: false,
      };
    default:
      return state;
  }
}
