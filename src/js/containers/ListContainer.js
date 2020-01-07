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
} from '../reducer/list';

function ListContainer({ category, lists }) {
  // list reducer
  const { sort } = useSelector(store => store.list, shallowEqual);

  const dispatch = useDispatch();

  const categoryCode = lists.code;

  useEffect(() => {
    switch (category.toUpperCase()) {
      case ACTION:
      case THRILLER:
      case CRIME:
      case WAR:
      case HORROR:
      case ROMANCE:
      case ANIMATION:
        dispatch(asyncAPI(category, categoryCode));
        break;
      default:
        console.log('지정된 리스트가 없습니다');
    }
    // 순서 정렬
    if (sort) {
      dispatch({ type: LIST_SORT });
    }
  }, [category, categoryCode, dispatch, sort]);

  return <List lists={lists} />;
}

export default ListContainer;
