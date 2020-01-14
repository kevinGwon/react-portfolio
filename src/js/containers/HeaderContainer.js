import React, { useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

// API
import { asyncAPI } from '../modules/asyncAPI';

import {
  // ACTION
  SEARCH_ON,
  SEARCH_OUT,
  // Load Thunk
  onSearchText,
} from '../reducer/load';

function HeaderContainer() {
  const { isSearch } = useSelector(store => store.load, shallowEqual);
  const [inputText, setInputText] = useState('');
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const dispatch = useDispatch();
  const $inputSearch = useRef();
  const onSubmit = useCallback(e => {
    e.preventDefault();
  }, []);

  const onSearch = useCallback(e => {
    setIsActiveSearch(true);
    $inputSearch.current.focus();
  }, []);

  const onChange = useCallback(
    e => {
      let searchText = e.target.value;
      dispatch({ type: SEARCH_ON });
      setInputText(searchText);
      // console.log(
      //   `1. search text = ${searchText} [HeaderContainer.js -> ListContainer.js]`,
      // );
      dispatch(onSearchText(searchText)); // dep = [isSearch]
    },
    [dispatch],
  );

  const onGoHome = useCallback(
    e => {
      dispatch({
        type: SEARCH_OUT,
      });
      setIsActiveSearch(false);
      setInputText('');
    },
    [dispatch],
  );

  return (
    <Header
      onSubmit={onSubmit}
      onSearch={onSearch}
      onChange={onChange}
      onGoHome={onGoHome}
      inputText={inputText}
      isSearch={isSearch}
      isActiveSearch={isActiveSearch}
      $inputSearch={$inputSearch}
    />
  );
}

export default HeaderContainer;
