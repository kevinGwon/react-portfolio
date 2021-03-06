import axios from 'axios';

import {
  // Thunk
  resetList,
} from '@/reducer/global';

import {
  // ACTION
  loadingList,
  listError,
  listErrorClear,

  // CATEGORY
  ACTION,
  THRILLER,
  CRIME,
  WAR,
  HORROR,
  ROMANCE,
  ANIMATION,
  SEARCH,
} from '@/reducer/list';

import {
  detailMovie,
  detailMovieSimilar,
  detailMovieCast,
  detailMovieVideo,
  detailReset,
} from '@/reducer/detail';

// Modules
import extend from './extend';

let opt = {
  key: '1e006c1e39b26bfadaa6f757bc1435cf',
  lang: 'ko-KR',
  fallBackPosterPath:
    'append_to_response=images&include_image_language=en,null',
  basePostImageUrl: 'https://image.tmdb.org/t/p/w500',
  baseBgImageUrl: 'https://image.tmdb.org/t/p/original',
};

const runVideo = async payload => {
  opt = extend(opt, {
    movieId: payload.movieId,
  });

  let getUrl = `https://api.themoviedb.org/3/movie/${opt.movieId}/videos?api_key=${opt.key}&language=${opt.lang}`;

  try {
    const response = await axios({
      method: 'get',
      url: getUrl,
    });
    payload.dispatch(detailMovieVideo(response.data.results));
  } catch (error) {
    console.log('검색 결과가 없습니다.');
  }
};

const runSimilar = async payload => {
  opt = extend(opt, {
    movieId: payload.movieId,
  });

  let getUrl = `https://api.themoviedb.org/3/movie/${opt.movieId}/similar?api_key=${opt.key}&language=${opt.lang}&page=1`;

  try {
    const response = await axios({
      method: 'get',
      url: getUrl,
    });
    payload.dispatch(detailMovieSimilar(response.data.results));
  } catch (error) {
    console.log('검색 결과가 없습니다.');
  }
};

const runCast = async payload => {
  opt = extend(opt, {
    movieId: payload.movieId,
  });

  let getUrl = `https://api.themoviedb.org/3/movie/${opt.movieId}/credits?api_key=${opt.key}&language=${opt.lang}&page=1`;

  try {
    const response = await axios({
      method: 'get',
      url: getUrl,
    });
    payload.dispatch(detailMovieCast(response.data.cast));
  } catch (error) {
    console.log('검색 결과가 없습니다.');
  }
};

const runResponse = async payload => {
  /*
   * The Movie Database API - https://www.themoviedb.org/
   *
   * API Option - https://developers.themoviedb.org/3/getting-started/introduction
   * key - 1e006c1e39b26bfadaa6f757bc1435cf
   */

  if (!payload.triggerDetail) {
    opt = extend(opt, {
      year: payload.year,
      month: payload.month,
      day: payload.day,
      category: payload.category,
      categoryCode: payload.categoryCode,
      isSearch: payload.isSearch,
      searchText: payload.searchText,
    });
  } else {
    opt = extend(opt, {
      triggerDetail: payload.triggerDetail,
      movieId: payload.movieId,
    });
  }

  let getUrl;

  // List
  if (!opt.triggerDetail && !opt.isSearch) {
    console.log(`[---- On List[${opt.category}] ----]`);
    getUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${opt.key}&language=${opt.lang}&release_date.gte=${opt.year}-${opt.month}-${opt.day}&with_genres=${opt.categoryCode}&sort_by=popularity.desc&include_adult=true&include_video=true&page=1`;
  }

  // Search
  if (opt.isSearch && !opt.triggerDetail) {
    console.log('[---- On Search ----]');
    let searching =
      opt.searchText !== undefined && opt.searchText.length ? true : false;
    let queryString = searching ? `&query=${opt.searchText}` : '';
    getUrl =
      queryString.length !== 0
        ? `https://api.themoviedb.org/3/search/multi?api_key=${opt.key}&language=${opt.lang}&include_adult=true${queryString}`
        : null;
  }

  // Detail
  if (opt.triggerDetail) {
    console.log('[---- On Detail ----]');
    getUrl = `https://api.themoviedb.org/3/movie/${opt.movieId}?api_key=${opt.key}&language=${opt.lang}$video=true`;
  }

  function listLoadingState(category) {
    setTimeout(() => {
      payload.dispatch(loadingList({ category, isLoading: true }));
    }, 1500);
  }

  function searchLoadingState(category) {
    // console.log('4. Trigger Loading true [asyncAPI.js]');
    setTimeout(() => {
      payload.dispatch(loadingList({ category, isLoading: true }));
    }, 500);
  }

  try {
    const response = await axios({
      method: 'get',
      url: getUrl,
    });

    payload.dispatch(listErrorClear());

    if (opt.triggerDetail) {
      payload.dispatch(detailMovie(response.data));
      opt.isSearch = false;
      opt.triggerDetail = false;

      runVideo({ dispatch: payload.dispatch, movieId: opt.movieId });
      runSimilar({ dispatch: payload.dispatch, movieId: opt.movieId });
      runCast({ dispatch: payload.dispatch, movieId: opt.movieId });
      return;
    }

    // 검색값이 없을면 return
    if (!response.data.results.length) {
      searchLoadingState(SEARCH.toLowerCase());
      return;
    }

    for (let i = 0; i < response.data.results.length; i++) {
      switch (payload.category.toUpperCase()) {
        case ACTION:
        case THRILLER:
        case CRIME:
        case WAR:
        case HORROR:
        case ROMANCE:
        case ANIMATION:
        case SEARCH:
          response.data.results[i] !== null &&
            payload.dispatch({
              type: `list/${payload.category.toUpperCase()}_LIST`,
              category: payload.category,
              [payload.category]: {
                category: payload.category,
                title: response.data.results[i].title,
                id: response.data.results[i].id,
                genre: response.data.results[i].genre_ids,
                average: response.data.results[i].vote_average,
                overview: response.data.results[i].overview,
                posterImage: `${opt.basePostImageUrl}${response.data.results[i].poster_path}`,
                bgImage: `${opt.baseBgImageUrl}${response.data.results[i].backdrop_path}`,
                date: response.data.results[i].release_date,
              },
            });
          break;
        default:
          console.log('지정된 리스트가 없습니다.');
      }

      // // 모든 API 로드가 완료되면 로딩화면 아웃
      if (i === response.data.results.length - 1) {
        payload.isSearch
          ? searchLoadingState(payload.category)
          : listLoadingState(payload.category);
      }
    }
  } catch (error) {
    const category = payload.category;
    opt.triggerDetail = false;
    getUrl = '';
    payload.dispatch(loadingList({ category, isLoading: true }));
    payload.dispatch(listError({ error }));
    payload.dispatch(detailReset());
  }
};

export const asyncAPI = payload => (dispatch, getState) => {
  const { year, month, day, genres } = getState().list;
  const { isSearch } = getState().global;

  const category = payload.category;
  const categoryCode = payload.categoryCode;
  const searchText = payload.searchText;
  const triggerDetail = payload.triggerDetail;
  const movieId = payload.movieId;

  if (!triggerDetail) {
    runResponse({
      dispatch,
      category,
      categoryCode,
      year,
      month,
      day,
      isSearch,
      searchText,
      genres,
    });
  } else {
    runResponse({
      dispatch,
      triggerDetail,
      movieId,
    });
  }
};
