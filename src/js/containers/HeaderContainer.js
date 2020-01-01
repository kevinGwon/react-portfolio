import React from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { RESET } from '../modules/list';
import { DAILY, WEEK } from '../modules/load';

function HeaderContainer() {
  const dispatch = useDispatch();
  const { daily, loading } = useSelector(store => ({
    daily: store.load.daily,
    loading: store.load.loading,
  }));
  const onDaily = e => {
    if (e.target.classList.contains('is-active')) return false;
    dispatch({
      type: RESET,
    });
    dispatch({
      type: DAILY,
      daily: true,
    });
  };
  const onWeek = e => {
    if (e.target.classList.contains('is-active')) return false;
    dispatch({
      type: RESET,
    });
    dispatch({
      type: WEEK,
      daily: true,
    });
  };
  return <Header daily={daily} onDaily={onDaily} onWeek={onWeek} />;
}

export default HeaderContainer;
