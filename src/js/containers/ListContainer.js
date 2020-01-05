import React, { useEffect } from 'react';
import List from '../components/List';
import { useSelector, useDispatch } from 'react-redux';

// API
import { koficDATA } from '../modules/asyncAPI';

// ACTION
import { LOADING, LOADING_OUT } from '../reducer/load';

function ListContainer() {
  // list reducer
  const { list } = useSelector(store => store.list, []);

  // load reducer
  const { daily, loading, searchText } = useSelector(store => store.load, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOADING });
    dispatch(koficDATA());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;

  return <List daily={daily} list={list} />;
}

export default ListContainer;
