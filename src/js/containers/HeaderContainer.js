import React, { useEffect, useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  // ACTION
  SEARCH_TEXT,
  SEARCH_TEXT_SAGA,
  SEARCH_ACTIVE_ON,
  SEARCH_ACTIVE_OUT,
  SEARCH_ON,
  SEARCH_OUT,

  // Load Thunk
  onSearchText,
} from '../reducer/global';

function HeaderContainer({ history }) {
  // global reducer
  const { isActiveSearch, isSearch } = useSelector(
    store => store.global,
    shallowEqual,
  );
  // load reducer
  const { isDetail } = useSelector(store => store.load, shallowEqual);

  const dispatch = useDispatch();

  const [inputText, setInputText] = useState('');
  const $inputSearch = useRef();
  let $app = null;
  let $articleWrap = null;

  const onSubmit = useCallback(e => {
    e.preventDefault();
  }, []);

  const onSearch = useCallback(
    e => {
      dispatch({ type: SEARCH_ACTIVE_ON });
      $inputSearch.current.focus();
    },
    [dispatch],
  );

  const onChange = useCallback(
    e => {
      let searchText = e.target.value;
      const searchState =
        ($app && $app.classList.contains('movie-app--search')) || false;

      if (isDetail) {
        history.push('/');
      }

      // Once SEARCH_ON
      !searchState && dispatch({ type: SEARCH_ON });
      setInputText(searchText);

      // console.log(
      //   `1. search text = ${searchText} [HeaderContainer.js -> ListContainer.js]`,
      // );

      // dispatch(onSearchText(searchText)); // dep = [isSearch]
      dispatch({
        type: SEARCH_TEXT_SAGA,
        searchText: searchText,
      });
    },
    [$app, dispatch, history, isDetail],
  );

  const onGoHome = useCallback(
    e => {
      dispatch({
        type: SEARCH_OUT,
      });
      dispatch({ type: SEARCH_ACTIVE_OUT });
      setInputText('');
      history.location.pathname.indexOf('detail') === 1 && history.push('/');
    },
    [dispatch, history],
  );

  const onSearchBlur = useCallback(() => {
    $app = document.getElementById('app');
    $articleWrap = $app.querySelector('.movie-article-wrap');

    $articleWrap &&
      $articleWrap.addEventListener('click', e => {
        ($app.querySelector('.header').classList.contains('is-active') ||
          $app
            .querySelector('.header')
            .classList.contains('is-active--detail')) &&
          dispatch({ type: SEARCH_ACTIVE_OUT });
      });
  }, []);

  useEffect(() => {
    onSearchBlur();
  }, [onSearchBlur]);

  return (
    <Header
      onSubmit={onSubmit}
      onSearch={onSearch}
      onChange={onChange}
      onGoHome={onGoHome}
      inputText={inputText}
      isSearch={isSearch}
      isDetail={isDetail}
      isActiveSearch={isActiveSearch}
      $inputSearch={$inputSearch}
    />
  );
}

HeaderContainer.displayName = 'HeaderContainer';

export default React.memo(withRouter(HeaderContainer));
