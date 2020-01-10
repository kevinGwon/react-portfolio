import React, { useEffect } from 'react';
import List from '../components/List';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// API
import { asyncAPI } from '../modules/asyncAPI';

// List Thunk
import { resetList } from '../reducer/list';

// ACTION
import { LOADING } from '../reducer/load';
import {
  LIST_SORT,
  ACTION,
  THRILLER,
  CRIME,
  WAR,
  HORROR,
  ROMANCE,
  ANIMATION,
  SEARCH,
} from '../reducer/list';

function ListContainer({ category, lists }) {
  // Reducer
  const { searchText } = useSelector(store => store.load, shallowEqual);

  const dispatch = useDispatch();

  const categoryCode = lists.code;

  useEffect(() => {
    // 로드가 완료된 리스트는 그대로 유지
    if (lists.isLoading) return;
    switch (category.toUpperCase()) {
      case ACTION:
      case THRILLER:
      case CRIME:
      case WAR:
      case HORROR:
      case ROMANCE:
      case ANIMATION:
        dispatch(asyncAPI({ category, categoryCode }));
        break;
      case SEARCH:
        dispatch(asyncAPI({ category, searchText }));
      default:
        console.log('----- No more list -----');
    }
  }, [category, categoryCode, dispatch, lists.isLoading, searchText]);

  return <List lists={lists} />;
}

export default ListContainer;
