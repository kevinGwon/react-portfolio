import imagesLoaded from 'imagesloaded';

// ACTION
import { ONCE_LOADING } from './global';

import {
  // ACTION
  LOADING_LIST,
  ALL_RESET,

  // CATEGORY
  SEARCH,
} from './list';

// List Thunk
import { resetList } from './list';

// Animation Thunk
import { reveal as animationReveal } from '../animation/reveal';

export const LOADING = 'load/LOADING';
export const LOADING_OUT = 'load/LOADING_OUT';
export const SEARCH_TEXT = 'load/SEARCH_TEXT';
export const SEARCH_ON = 'load/SEARCH_ON';
export const SEARCH_OUT = 'load/SEARCH_OUT';

export const onSearchText = searchText => dispatch => {
  dispatch(resetList({ category: SEARCH.toLowerCase() }));
  setTimeout(() => {
    dispatch({
      type: SEARCH_TEXT,
      searchText: searchText,
    });
  }, 0);
};

export const onLoading = genres => (dispatch, getState) => {
  if (
    !getState().global.onceLoading &&
    genres.action.isLoading &&
    genres.thriller.isLoading &&
    genres.crime.isLoading &&
    genres.war.isLoading &&
    genres.horror.isLoading &&
    genres.romance.isLoading &&
    genres.animation.isLoading
  ) {
    imagesLoaded('#app', { background: true }, () => {
      dispatch({ type: ONCE_LOADING });
      dispatch(animationReveal());
    });
  }
};

const initState = {
  isLoading: true,
  isSearch: false,
  searchText: '',
};

export default function load(state = initState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_OUT:
      return {
        ...state,
        isLoading: false,
      };
    case SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText,
      };
    case SEARCH_ON:
      return {
        ...state,
        isSearch: true,
      };
    case SEARCH_OUT:
      return {
        ...state,
        isSearch: false,
        searchText: '',
      };
    default:
      return state;
  }
}
