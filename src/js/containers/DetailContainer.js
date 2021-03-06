import React, { useEffect, useState, useCallback } from 'react';
import Detail from '@/components/Detail';
import widthScrollMotion from '@/hoc/withScrollMotion';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import LoadingCircle from '@/components/LoadingCircle';

import {
  // ACTION
  searchActiveOut,
  searchOut,

  // Thunk
  onLoading,
} from '@/reducer/global';

import {
  // ACTION
  detailOn,
  detailOut,
} from '@/reducer/load';

import { DETAIL_LOADING_OUT } from '@/reducer/detail';

// API
import { asyncAPI } from '@/modules/asyncAPI';

function DetailContainer({ scrollMotion, match }) {
  const { movie } = useSelector(store => store.detail, shallowEqual);
  const { error } = useSelector(store => store.list, shallowEqual);

  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const triggerDetail = true;
  const movieId = match.params.id;

  const scrollToUp = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    scrollMotion.destroy();
    dispatch(searchOut());
    dispatch(onLoading({ triggerDetail }));
    dispatch(detailOn());
    dispatch(searchActiveOut());
    dispatch(asyncAPI({ triggerDetail, movieId }));
    return () => {
      dispatch(detailOut());
      setIsloading(false);
    };
  }, [dispatch, movieId, scrollMotion, triggerDetail]);

  if (!isLoading) {
    if (error) {
      setTimeout(() => {
        setIsloading(true);
      }, 1500);
    }
    if (movie.id) {
      setTimeout(() => {
        setIsloading(true);
      }, 1500);
    }
    return <LoadingCircle />;
  }

  return <Detail movie={movie} error={error} scrollToUp={scrollToUp} />;
}

DetailContainer.displayName = 'DetailContainer';

export default React.memo(widthScrollMotion(DetailContainer));
