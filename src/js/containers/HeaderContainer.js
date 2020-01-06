import React, { useState } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';

// API
// import { koficDATA } from '../modules/asyncAPI';
import { onSearch } from '../reducer/load';

// ACTION
import { SEARCH_TEXT, SEARCH } from '../reducer/load';

function HeaderContainer() {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const { daily } = useSelector(store => ({
    daily: store.load.daily,
  }));
  const onSubmit = e => {
    e.preventDefault();
    dispatch({ type: SEARCH });
    dispatch(onSearch(searchText));
  };
  const onChange = e => {
    setSearchText(e.target.value);
  };
  return <Header daily={daily} onSubmit={onSubmit} onChange={onChange} />;
}

export default HeaderContainer;
