import { put, delay, takeLatest } from 'redux-saga/effects';

import imagesLoaded from 'imagesloaded';

// Animation Thunk
import { reveal as animationReveal } from '../animation/reveal';

import {
  // CATEGORY
  SEARCH,
  LIST_RESET,
} from './list';

export const ONCE_LOADING = 'global/ONCE_LOADING';
export const SEARCH_ACTIVE_ON = 'global/SEARCH_ACTIVE_ON';
export const SEARCH_ACTIVE_OUT = 'global/SEARCH_ACTIVE_OUT';
export const SEARCH_TEXT = 'global/SEARCH_TEXT';
export const SEARCH_TEXT_SAGA = 'global/SEARCH_TEXT_SAGA';
export const SEARCH_ON = 'global/SEARCH_ON';
export const SEARCH_OUT = 'global/SEARCH_OUT';

export const onceLoading = () => ({
  type: ONCE_LOADING,
});
export const searchActiveOn = () => ({
  type: SEARCH_ACTIVE_ON,
});
export const searchActiveOut = () => ({
  type: SEARCH_ACTIVE_OUT,
});
export const searchTextSaga = text => ({
  type: SEARCH_TEXT_SAGA,
  searchText: text,
});
export const searchOn = () => ({
  type: SEARCH_ON,
});
export const searchOut = () => ({
  type: SEARCH_OUT,
});

// Thunk
export const onLoading = props => (dispatch, getState) => {
  if (props.triggerDetail) {
    dispatch(onceLoading());
    dispatch(animationReveal());
    return;
  }
  if (
    !getState().global.onceLoading &&
    props.genres.action.isLoading &&
    props.genres.thriller.isLoading &&
    props.genres.crime.isLoading &&
    props.genres.war.isLoading &&
    props.genres.horror.isLoading &&
    props.genres.romance.isLoading &&
    props.genres.animation.isLoading
  ) {
    imagesLoaded('#app', { background: true }, () => {
      dispatch(onceLoading());
      dispatch(animationReveal());
    });
  }
};

// Saga
function* searchText(action) {
  yield delay(500);
  yield put({
    type: LIST_RESET,
    category: 'search',
  });
  yield put({
    type: SEARCH_TEXT,
    searchText: action.searchText,
  });
}

export function* searchSaga() {
  yield takeLatest(SEARCH_TEXT_SAGA, searchText);
}

const initState = {
  onceLoading: false,
  isActiveSearch: false,
  isSearch: false,
  searchText: '',
};

export default function global(state = initState, action) {
  switch (action.type) {
    case ONCE_LOADING:
      return {
        ...state,
        onceLoading: true,
      };
    case SEARCH_ACTIVE_ON:
      return {
        ...state,
        isActiveSearch: true,
      };
    case SEARCH_ACTIVE_OUT:
      return {
        ...state,
        isActiveSearch: false,
      };
    case SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText,
      };
    case SEARCH_TEXT_SAGA:
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
