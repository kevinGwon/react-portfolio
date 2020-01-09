import React, { useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';

// API
import { asyncAPI } from '../modules/asyncAPI';

// Load Thunk
import { onSearch } from '../reducer/load';

function HeaderContainer() {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
  };
  const onChange = useCallback(
    e => {
      let searchText = e.target.value;
      setInputText(searchText);
      dispatch(onSearch(searchText));
    },
    [dispatch],
  );

  return (
    <Header onSubmit={onSubmit} onChange={onChange} inputText={inputText} />
  );
}

export default HeaderContainer;
