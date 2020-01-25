import React, { useEffect, useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  // ACTION
  searchTextSaga,
  searchActiveOn,
  searchActiveOut,
  searchOn,
  searchOut,
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
      dispatch(searchActiveOn());
      $inputSearch.current.focus();
    },
    [dispatch],
  );

  const onChange = useCallback(
    e => {
      let text = e.target.value;
      const searchState =
        ($app && $app.classList.contains('movie-app--search')) || false;

      if (isDetail) {
        history.push('/');
      }

      // Once SEARCH_ON
      !searchState && dispatch(searchOn());
      setInputText(text);

      dispatch(searchTextSaga(text));
    },
    [$app, dispatch, history, isDetail],
  );

  const onGoHome = useCallback(
    e => {
      dispatch(searchOut());
      dispatch(searchActiveOut());
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
          dispatch(searchActiveOut());
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
