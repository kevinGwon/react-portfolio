import imagesLoaded from 'imagesloaded';

// ACTION
import { ALL_RESET } from './list';

// Animation Thunk
import { reveal as animationReveal } from '../animation/reveal';

export const LOADING = 'load/LOADING';
export const LOADING_OUT = 'load/LOADING_OUT';
export const SEARCH_TEXT = 'load/SEARCH_TEXT';
export const SEARCH = 'load/SEARCH';
export const SEARCH_OUT = 'load/SEARCH_OUT';

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
};

export const onLoading = genres => (dispatch, getState) => {
  if (
    genres.action.isLoading &&
    genres.thriller.isLoading &&
    genres.crime.isLoading &&
    genres.war.isLoading &&
    genres.horror.isLoading &&
    genres.romance.isLoading &&
    genres.animation.isLoading
  ) {
    imagesLoaded('#app', { background: true }, () => {
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
    case SEARCH:
      return {
        ...state,
        isSearch: true,
      };
    case SEARCH_OUT:
      return {
        ...state,
        isSearch: false,
      };
    default:
      return state;
  }
}
