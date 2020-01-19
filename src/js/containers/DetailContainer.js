import React, { useEffect, useState } from 'react';
import Detail from '@/components/Detail';
import widthScrollMotion from '@/hoc/withScrollMotion';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import LoadingCircle from '@/components/LoadingCircle';

import {
  // ACTION
  SEARCH_ACTIVE_OUT,
  SEARCH_OUT,

  // Thunk
  onLoading,
} from '@/reducer/global';

import {
  // ACTION
  DETAIL_ON,
  DETAIL_OUT,
} from '@/reducer/load';

import { DETAIL_LOADING_OUT } from '@/reducer/detail';

// API
import { asyncAPI } from '@/modules/asyncAPI';

function DetailContainer({ scrollMotion, match }) {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const { movie } = useSelector(store => store.detail, shallowEqual);
  const triggerDetail = true;
  const movieId = match.params.id;

  useEffect(() => {
    scrollMotion.destroy();
    dispatch({
      type: SEARCH_OUT,
    });
    dispatch(onLoading({ triggerDetail }));
    dispatch({ type: DETAIL_ON });
    dispatch({ type: SEARCH_ACTIVE_OUT });
    dispatch(asyncAPI({ triggerDetail, movieId }));
    return () => {
      dispatch({ type: DETAIL_OUT });
      setIsloading(false);
    };
  }, [dispatch, movieId, scrollMotion, triggerDetail]);

  if (!isLoading) {
    if (movie.id) {
      setTimeout(() => {
        setIsloading(true);
      }, 1500);
    }
    return <LoadingCircle />;
  }

  return <Detail movie={movie} />;
}

export default widthScrollMotion(DetailContainer);
