import axios from 'axios';

import {
  // Thunk
  resetList,
} from '../reducer/global';

import {
  // ACTION
  ACTION_LIST,
  THRILLER_LIST,
  LIST_SORT,
  CRIME_LIST,
  WAR_LIST,
  HORROR_LIST,
  ROMANCE_LIST,
  ANIMATION_LIST,
  LOADING_LIST,
  SEARCH_LIST,

  // CATEGORY
  ACTION,
  THRILLER,
  CRIME,
  WAR,
  HORROR,
  ROMANCE,
  ANIMATION,
  SEARCH,
} from '../reducer/list';

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

const runResponse = async payload => {
  /*
   * The Movie Database API - https://www.themoviedb.org/
   *
   * API Option - https://developers.themoviedb.org/3/getting-started/introduction
   * key - 1e006c1e39b26bfadaa6f757bc1435cf
   */

  opt = extend(opt, {
    year: payload.year,
    month: payload.month,
    day: payload.day,
    category: payload.category,
    categoryCode: payload.categoryCode,
    isSearch: payload.isSearch,
    searchText: payload.searchText,
  });

  let getUrl;

  if (opt.isSearch) {
    let searching =
      opt.searchText !== undefined && opt.searchText.length ? true : false;
    let queryString = searching ? `&query=${opt.searchText}` : '';
    getUrl =
      queryString.length !== 0
        ? `https://api.themoviedb.org/3/search/multi?api_key=${opt.key}&language=${opt.lang}&include_adult=true${queryString}`
        : null;
  } else {
    getUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${opt.key}&language=${opt.lang}&release_date.gte=${opt.year}-${opt.month}-${opt.day}&with_genres=${opt.categoryCode}&sort_by=popularity.desc&include_adult=true&include_video=true&page=1`;
  }

  function listLoadingState(category) {
    setTimeout(() => {
      payload.dispatch({
        type: LOADING_LIST,
        category: category,
        isLoading: true,
      });
    }, 1500);
  }

  function searchLoadingState(category) {
    // console.log('4. Trigger Loading true [asyncAPI.js]');
    payload.dispatch({
      type: LOADING_LIST,
      category: category,
      isLoading: true,
    });
  }

  try {
    const response = await axios({
      method: 'get',
      url: getUrl,
    });

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
        // payload.isSearch &&
        //   console.log(
        //     `Search Length = ${response.data.results.length} [asyncAPI.js]`,
        //   );
        payload.isSearch
          ? searchLoadingState(payload.category)
          : listLoadingState(payload.category);
      }
    }
  } catch (error) {
    console.log('검색 결과가 없습니다.');
  }
};

export const asyncAPI = payload => (dispatch, getState) => {
  const { year, month, day, genres } = getState().list;
  const { isSearch } = getState().global;

  const category = payload.category;
  const categoryCode = payload.categoryCode;
  const searchText = payload.searchText;

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
};
