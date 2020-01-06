import axios from 'axios';

// ACTION
import { DISCOVER_LIST, LIST_SORT } from '../reducer/list';
import { LOADING, LOADING_OUT } from '../reducer/load';

export const discoverAPI = () => async (dispatch, getState) => {
  const { year, month, day, discoverList } = getState().list;
  const { isSearch } = getState().load;

  let opt = {
    key: '1e006c1e39b26bfadaa6f757bc1435cf',
    lang: 'ko-KR',
    fallBackPosterPath:
      'append_to_response=images&include_image_language=en,null',
    baseImageUrl: 'https://image.tmdb.org/t/p/w500',
    query: ['테이큰'],
  };

  try {
    /*
     * The Movie Database API - https://www.themoviedb.org/
     *
     * API Option - https://developers.themoviedb.org/3/getting-started/introduction
     * key - 1e006c1e39b26bfadaa6f757bc1435cf
     */
    const response = await axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${opt.key}&language=${opt.lang}&release_date.gte=${year}${month}${day}&sort_by=popularity.desc&include_adult=true&include_video=true&page=1`,
    });

    for (let i = 0; i < response.data.results.length; i++) {
      dispatch({
        type: DISCOVER_LIST,
        discoverList: {
          title: response.data.results[i].title,
          id: response.data.results[i].id,
          genre: response.data.results[i].genre_ids,
          overview: response.data.results[i].overview,
          posterImage: `${opt.baseImageUrl}${response.data.results[i].poster_path}`,
          bgImage: `${opt.baseImageUrl}${response.data.results[i].backdrop_path}`,
        },
      });

      // 모든 API 로드가 완료되면 로딩화면 아웃
      if (i === response.data.results.length - 1) {
        console.log('LAST CALL - API ');
        dispatch({ type: LIST_SORT });
        dispatch({ type: LOADING_OUT });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
