import React, { useState } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';

import { SEARCH_TEXT, onDaily, onWeek } from '../modules/load';

function HeaderContainer() {
  const [searchText, setSearchText] = useState('');
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
  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: SEARCH_TEXT,
      searchText: searchText,
    });
  };
  const onChange = e => {
    setSearchText(e.target.value);
  };
  return (
    <Header
      daily={daily}
      onRunDaily={onRunDaily}
      onRunWeek={onRunWeek}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
}

export default HeaderContainer;
