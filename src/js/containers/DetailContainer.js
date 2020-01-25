import React, { useEffect, useState } from 'react';
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
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const { movie } = useSelector(store => store.detail, shallowEqual);
  const triggerDetail = true;
  const movieId = match.params.id;

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
    if (movie.id) {
      setTimeout(() => {
        setIsloading(true);
      }, 1500);
    }
    return <LoadingCircle />;
  }

  return <Detail movie={movie} />;
}

DetailContainer.displayName = 'DetailContainer';

export default React.memo(widthScrollMotion(DetailContainer));
