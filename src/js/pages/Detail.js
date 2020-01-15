import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  // ACTION
  DETAIL_ON,
  DETAIL_OUT,
} from '../reducer/load';

function Detail({ match }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: DETAIL_ON });
    return () => {
      dispatch({ type: DETAIL_OUT });
    };
  }, [dispatch]);

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

export default Detail;
