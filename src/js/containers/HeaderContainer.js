import React from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';

import { onDaily, onWeek } from '../modules/load';

function HeaderContainer() {
  const dispatch = useDispatch();
  const { daily } = useSelector(store => ({
    daily: store.load.daily,
  }));
  const onRunDaily = e => {
    if (e.target.classList.contains('is-active')) return false;
    dispatch(onDaily());
  };
  const onRunWeek = e => {
    if (e.target.classList.contains('is-active')) return false;
    dispatch(onWeek());
  };
  return <Header daily={daily} onRunDaily={onRunDaily} onRunWeek={onRunWeek} />;
}

export default HeaderContainer;
