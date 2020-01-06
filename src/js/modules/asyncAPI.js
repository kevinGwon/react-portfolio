import axios from 'axios';

// ACTION
import { POPULARITY_LIST, AVERAGE_LIST, LIST_SORT } from '../reducer/list';
import { LOADING_OUT } from '../reducer/load';

// Modules
import extend from './extend';

// CATEGORY
import { POPULARITY, AVERAGE } from '../reducer/list';

let opt = {
  key: '1e006c1e39b26bfadaa6f757bc1435cf',
  lang: 'ko-KR',
  fallBackPosterPath:
    'append_to_response=images&include_image_language=en,null',
  baseImageUrl: 'https://image.tmdb.org/t/p/w500',
};

const runResponse = async props => {
  /*
   * The Movie Database API - https://www.themoviedb.org/
   *
   * API Option - https://developers.themoviedb.org/3/getting-started/introduction
   * key - 1e006c1e39b26bfadaa6f757bc1435cf
   */

  opt = extend(opt, {
    category: (() => {
      return props.category.toLowerCase() === 'average'
        ? `vote_${props.category.toLowerCase()}`
        : props.category.toLowerCase();
    })(),
  });

  try {
    const response = await axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${opt.key}&language=${opt.lang}&release_date.gte=${props.year}-${props.month}-${props.day}&sort_by=${opt.category}.desc&include_adult=true&include_video=true&page=1`,
    });

    // console.log(response.data);

    for (let i = 0; i < response.data.results.length; i++) {
      switch (props.category) {
        case POPULARITY:
          response.data.results[i] !== null &&
            props.dispatch({
              type: POPULARITY_LIST,
              popularity: {
                title: response.data.results[i].title,
                id: response.data.results[i].id,
                genre: response.data.results[i].genre_ids,
                average: response.data.results[i].vote_average,
                overview: response.data.results[i].overview,
                posterImage: `${opt.baseImageUrl}${response.data.results[i].poster_path}`,
                bgImage: `${opt.baseImageUrl}${response.data.results[i].backdrop_path}`,
                date: response.data.results[i].release_date,
              },
            });
          break;
        case AVERAGE:
          response.data.results[i] !== null &&
            props.dispatch({
              type: AVERAGE_LIST,
              average: {
                title: response.data.results[i].title,
                id: response.data.results[i].id,
                genre: response.data.results[i].genre_ids,
                average: response.data.results[i].vote_average,
                overview: response.data.results[i].overview,
                posterImage: `${opt.baseImageUrl}${response.data.results[i].poster_path}`,
                bgImage: `${opt.baseImageUrl}${response.data.results[i].backdrop_path}`,
                date: response.data.results[i].release_date,
              },
            });
          break;
        default:
          console.log('지정된 리스트가 없습니다.');
      }

      // 모든 API 로드가 완료되면 로딩화면 아웃
      if (i === response.data.results.length - 1) {
        props.dispatch({ type: LIST_SORT });
        props.dispatch({ type: LOADING_OUT });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAPI = category => (dispatch, getState) => {
  const { year, month, day } = getState().list;
  const { isSearch } = getState().load;

  runResponse({ dispatch, category, year, month, day, isSearch });
};
