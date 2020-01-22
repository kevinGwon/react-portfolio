import React, { useEffect, useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  // ACTION
  SEARCH_ACTIVE_ON,
  SEARCH_ACTIVE_OUT,

  // ACTION
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
  let $article = null;

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
        ($article && $article.classList.contains('movie-article--search')) ||
        false;

      if (isDetail) {
        history.push('/');
      }

      // Once SEARCH_ON
      !searchState && dispatch({ type: SEARCH_ON });
      setInputText(searchText);

      // console.log(
      //   `1. search text = ${searchText} [HeaderContainer.js -> ListContainer.js]`,
      // );

      dispatch(onSearchText(searchText)); // dep = [isSearch]
    },
    [$article, dispatch, history, isDetail],
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
    if ($article) {
      $article
        .querySelector('.movie-section-box')
        .addEventListener('click', e => {
          dispatch({ type: SEARCH_ACTIVE_OUT });
        });
    }
  }, [$article, dispatch]);

  useEffect(() => {
    $article = document.querySelector('.movie-article');
    onSearchBlur();
  }, [$article]);

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

export default withRouter(HeaderContainer);
