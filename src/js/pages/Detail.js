import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import widthScrollMotion from '../hoc/withScrollMotion';

import {
  // ACTION
  SEARCH_ACTIVE_OUT,
  SEARCH_OUT,

  // Thunk
  onLoading,
} from '../reducer/global';

import {
  // ACTION
  DETAIL_ON,
  DETAIL_OUT,
} from '../reducer/load';

function Detail({ match, scrollMotion }) {
  const dispatch = useDispatch();

  useEffect(() => {
    scrollMotion.destroy();
    dispatch({ type: DETAIL_ON });
    dispatch({
      type: SEARCH_OUT,
    });
    dispatch({ type: SEARCH_ACTIVE_OUT });
    return () => {
      dispatch({ type: DETAIL_OUT });
    };
  }, [dispatch, scrollMotion]);

  return (
    <article className="article article-detail">
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
      <div>{match.params.id}</div>
    </article>
  );
}

export default widthScrollMotion(Detail);
