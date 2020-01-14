import React, { useEffect } from 'react';
import List from '../components/List';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// API
import { asyncAPI } from '../modules/asyncAPI';

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
    if (!lists.isLoading) {
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
          // console.log(`2. [ListContainer.js -> asyncAPI.js]`);
          dispatch(asyncAPI({ category, searchText }));
          break;
        default:
          console.log('----- Not Found Category -----');
      }
    }
  }, [category, categoryCode, dispatch, lists.isLoading, searchText]);

  return <List lists={lists} />;
}

export default ListContainer;
