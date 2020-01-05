import axios from 'axios';

// ACTION
import { KOFIC_DATA, KMDB_DATA, LIST_SORT } from '../reducer/list';
import { LOADING, LOADING_OUT } from '../reducer/load';

export const kmdbDATA = () => async (dispatch, getState) => {
  const { year, query } = getState().list;
  const { daily, searchText } = getState().load;

  const searchQuery = searchText.length === 0 ? query : [{ query: searchText }];

  try {
    /*
     * 한국영화데이터베이스 오픈 API - https://www.kmdb.or.kr/main
     *
     * rest - http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml.jsp?collection=kmdb_new&detail=N&director=%EB%B0%95%EC%B0%AC%EC%9A%B1&ServiceKey=인증키값
     * key - 3M5U8T5PG7R74K1J2828
     */
    for (let i = 0; i < searchQuery.length; i++) {
      const response = await axios({
        method: 'get',
        url: `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json.jsp?collection=kmdb_new&detail=Y&listCount=10&query=${searchQuery[i].query}&createDts=${year}&sort=prodYear&ServiceKey=3M5U8T5PG7R74K1J2828`,
      });
      dispatch({
        type: KMDB_DATA,
        data: response.data,
        list: {
          rank: searchQuery[i].rank,
          theme: searchQuery[i].query,
          data: response.data,
        },
      });
      // 모든 API 로드가 완료되면 로딩화면 아웃
      if (i === searchQuery.length - 1) {
        dispatch({ type: LIST_SORT });
        dispatch({ type: LOADING_OUT });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const koficDATA = () => async (dispatch, getState) => {
  const { year, month, day, query, list } = getState().list;
  const { daily } = getState().load;

  dispatch({ type: LOADING });
  try {
    /*
     * 영화관입장권통합전산망 오픈 API - http://www.kobis.or.kr/kobisopenapi/homepg/main/main.do
     *
     * rest - http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=20120101
     * key - dcff08753bb2a2277b21a9fa2c36baf7
     */
    const response = await axios({
      method: 'get',
      url: `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/${
        daily ? 'searchDailyBoxOfficeList' : 'searchWeeklyBoxOfficeList'
      }.json?key=dcff08753bb2a2277b21a9fa2c36baf7&targetDt=${year}${month}${day}&multiMovieYn=N${
        daily ? '' : '&weekGb=0'
      }`,
    });
    dispatch({
      type: KOFIC_DATA,
      data: daily
        ? response.data.boxOfficeResult.dailyBoxOfficeList
        : response.data.boxOfficeResult.weeklyBoxOfficeList,
    });
    dispatch(kmdbDATA());
  } catch (error) {
    console.log(error);
  }
};
