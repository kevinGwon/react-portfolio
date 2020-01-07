import axios from 'axios';

// ACTION
import {
  ACTION_LIST,
  THRILLER_LIST,
  LIST_SORT,
  CRIME_LIST,
  WAR_LIST,
  HORROR_LIST,
  ROMANCE_LIST,
  ANIMATION_LIST,
} from '../reducer/list';

// CATEGORY
import {
  ACTION,
  THRILLER,
  CRIME,
  WAR,
  HORROR,
  ROMANCE,
  ANIMATION,
} from '../reducer/list';

import { LOADING_OUT } from '../reducer/load';

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

const runResponse = async props => {
  /*
   * The Movie Database API - https://www.themoviedb.org/
   *
   * API Option - https://developers.themoviedb.org/3/getting-started/introduction
   * key - 1e006c1e39b26bfadaa6f757bc1435cf
   */

  opt = extend(opt, {
    year: props.year,
    month: props.month,
    day: props.day,
    category: props.category,
    categoryCode: props.categoryCode,
  });

  try {
    const response = await axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${opt.key}&language=${opt.lang}&release_date.gte=${opt.year}-${opt.month}-${opt.day}&with_genres=${opt.categoryCode}&sort_by=popularity.desc&include_adult=true&include_video=true&page=1`,
    });

    for (let i = 0; i < response.data.results.length; i++) {
      switch (props.category.toUpperCase()) {
        case ACTION:
        case THRILLER:
        case CRIME:
        case WAR:
        case HORROR:
        case ROMANCE:
        case ANIMATION:
          response.data.results[i] !== null &&
            props.dispatch({
              type: `${props.category.toUpperCase()}_LIST`,
              [props.category]: {
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
        props.dispatch({ type: LIST_SORT });
        props.dispatch({ type: LOADING_OUT });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncAPI = (category, categoryCode) => (dispatch, getState) => {
  const { year, month, day } = getState().list;
  const { isSearch } = getState().load;

  runResponse({ dispatch, category, categoryCode, year, month, day, isSearch });
};
