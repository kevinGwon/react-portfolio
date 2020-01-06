import React, { useEffect } from 'react';
import List from '../components/List';
import { useSelector, useDispatch } from 'react-redux';

// API
import { discoverAPI } from '../modules/asyncAPI';

// ACTION
import { LIST_SORT } from '../reducer/list';
import { LOADING } from '../reducer/load';

function ListContainer() {
  // list reducer
  const { discoverList, sort } = useSelector(store => store.list, []);

  // load reducer
  const { isLoading } = useSelector(store => store.load, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOADING });
    dispatch(discoverAPI());
  }, [dispatch]);

  // 순서 정렬
  if (sort) {
    console.log('sort = ' + sort);
    // listSort.sort((prev, next) => {
    //   if (parseInt(prev.rank, 10) > parseInt(next.rank, 10)) {
    //     return 1;
    //   }
    //   if (parseInt(prev.rank, 10) < parseInt(next.rank, 10)) {
    //     return -1;
    //   }
    //   return 0;
    // });
    // listSort.map(item => {
    //   console.log(item);
    // });

    // off sort
    dispatch({ type: LIST_SORT });
  }
  if (isLoading) return <div>로딩중...</div>;

  return <List list={discoverList} />;
}

export default ListContainer;
