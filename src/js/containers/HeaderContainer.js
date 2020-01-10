import React, { useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// API
import { asyncAPI } from '../modules/asyncAPI';

import {
  // ACTION
  SEARCH_OUT,
  // Load Thunk
  onSearch,
} from '../reducer/load';

function HeaderContainer() {
  const { isSearch } = useSelector(store => store.load, shallowEqual);
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  const onSubmit = useCallback(e => {
    e.preventDefault();
  }, []);

  const onChange = useCallback(
    e => {
      let searchText = e.target.value;
      setInputText(searchText);
      dispatch(onSearch(searchText));

      if (!searchText.length) {
        dispatch({
          type: SEARCH_OUT,
        });
      }
    },
    [dispatch],
  );

  const onGoHome = useCallback(
    e => {
      dispatch({
        type: SEARCH_OUT,
      });
      setInputText('');
    },
    [dispatch],
  );

  return (
    <Header
      onSubmit={onSubmit}
      onChange={onChange}
      onGoHome={onGoHome}
      inputText={inputText}
      isSearch={isSearch}
    />
  );
}

export default HeaderContainer;
