import React, { useEffect } from 'react';
import List from '../components/List';
import { useSelector, useDispatch } from 'react-redux';

// API
import { getAPI } from '../modules/asyncAPI';

// ACTION
import { LIST_SORT } from '../reducer/list';
import { LOADING } from '../reducer/load';

// CATEGORY
import { POPULARITY, AVERAGE } from '../reducer/list';

function ListContainer({ category, lists }) {
  // list reducer
  const { sort } = useSelector(store => store.list, []);

  // load reducer
  const { isLoading } = useSelector(store => store.load, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOADING });

    switch (category) {
      case POPULARITY:
        dispatch(getAPI(POPULARITY));
        break;
      case AVERAGE:
        dispatch(getAPI(AVERAGE));
        break;
      default:
        console.log('지정된 리스트가 없습니다');
    }
  }, [category, dispatch]);

  // 순서 정렬
  if (sort) {
    dispatch({ type: LIST_SORT });
  }

  if (isLoading) return <div>로딩중...</div>;

  return <List lists={lists} />;
}

export default ListContainer;
