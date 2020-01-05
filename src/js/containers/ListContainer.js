import React, { useEffect } from 'react';
import List from '../components/List';
import { useSelector, useDispatch } from 'react-redux';

// API
import { koficDATA } from '../modules/asyncAPI';

// ACTION
import { LIST_SORT } from '../reducer/list';
import { LOADING, LOADING_OUT } from '../reducer/load';

function ListContainer() {
  // list reducer
  const { list, sort } = useSelector(store => store.list, []);

  // load reducer
  const { daily, isLoading, searchText } = useSelector(store => store.load, []);
  const dispatch = useDispatch();

  let listSort = list;

  useEffect(() => {
    dispatch({ type: LOADING });
    dispatch(koficDATA());
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
    listSort.map(item => {
      if (
        item.data.Data[0].Result !== undefined &&
        item.data.Data[0].Result.length > 1
      ) {
        return item.data.Data[0].Result.reverse();
      }
      return item;
    });

    // off sort
    dispatch({ type: LIST_SORT });
  }

  if (isLoading) return <div>로딩중...</div>;

  return <List daily={daily} list={listSort} />;
}

export default ListContainer;
