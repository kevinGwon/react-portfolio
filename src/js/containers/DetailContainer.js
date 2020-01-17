import React, { useEffect, useState } from 'react';
import Detail from '../components/Detail';
import widthScrollMotion from '../hoc/withScrollMotion';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import LoadingCircle from '../components/LoadingCircle';

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

// API
import { asyncAPI } from '../modules/asyncAPI';

function DetailContainer(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const movie = useSelector(store => store.detail, shallowEqual);
  const triggerDetail = true;
  const movieId = props.match.params.id;

  useEffect(() => {
    props.scrollMotion.destroy();
    dispatch({
      type: SEARCH_OUT,
    });
    dispatch({ type: DETAIL_ON });
    dispatch({ type: SEARCH_ACTIVE_OUT });
    dispatch(asyncAPI({ triggerDetail, movieId }));
    return () => {
      dispatch({ type: DETAIL_OUT });
    };
  }, [dispatch, movieId, props.scrollMotion, triggerDetail]);

  if (!loading) {
    if (movie.id) {
      setTimeout(() => {
        setLoading(true);
      }, 1500);
    }
    return <LoadingCircle />;
  }

  return <Detail {...props} movie={movie} />;
}

export default widthScrollMotion(DetailContainer);
