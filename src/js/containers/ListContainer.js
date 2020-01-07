import React, { useEffect } from 'react';
import List from '../components/List';
import { useSelector, useDispatch } from 'react-redux';

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
  const { sort } = useSelector(store => store.list, []);

  // load reducer
  const { isLoading } = useSelector(store => store.load, []);
  const dispatch = useDispatch();

  const categoryCode = lists.code;

  useEffect(() => {
    dispatch({ type: LOADING });

    switch (category.toUpperCase()) {
      case ACTION:
        dispatch(asyncAPI(category, categoryCode));
        break;
      // eslint-disable-next-line no-duplicate-case
      case THRILLER:
        dispatch(asyncAPI(category, categoryCode));
        break;
      case CRIME:
        dispatch(asyncAPI(category, categoryCode));
        break;
      case WAR:
        dispatch(asyncAPI(category, categoryCode));
        break;
      case HORROR:
        dispatch(asyncAPI(category, categoryCode));
        break;
      case ROMANCE:
        dispatch(asyncAPI(category, categoryCode));
        break;
      case ANIMATION:
        dispatch(asyncAPI(category, categoryCode));
        break;
      default:
        console.log('지정된 리스트가 없습니다');
    }
  }, [category, categoryCode, dispatch]);

  // 순서 정렬
  if (sort) {
    dispatch({ type: LIST_SORT });
  }

  return <List lists={lists} />;
}

export default ListContainer;
