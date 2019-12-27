import React, { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';

const initailState = {
  query: [],
  list: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'KOFIC_DATA':
      // 영화순위 목록
      action.data.map(item =>
        state.query.push({
          rank: item.rank,
          query: item.movieNm
        })
      );
      return {
        ...state,
        koficDATA: action.data
      };
    case 'KMDB_DATA':
      return {
        ...state,
        kmdbDATA: action.data,
        list: [...state.list, action.list]
      };
    default:
      state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initailState);
  useEffect(() => {
    const koficDATA = async () => {
      try {
        /*
         * 영화관입장권통합전산망 오픈 API - http://www.kobis.or.kr/kobisopenapi/homepg/main/main.do
         *
         * rest - http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=20120101
         * key - dcff08753bb2a2277b21a9fa2c36baf7
         */
        const response = await axios({
          method: 'get',
          url:
            'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=dcff08753bb2a2277b21a9fa2c36baf7&targetDt=20191201&multiMovieYn=N&weekGb=0'
        });
        dispatch({
          type: 'KOFIC_DATA',
          data: response.data.boxOfficeResult.weeklyBoxOfficeList
        });
        state.query.map(item => kmdbDATA(item.query, item.rank));
      } catch (error) {
        console.log(error);
      }
    };
    const kmdbDATA = async (query, rank) => {
      /*
       * 한국영화데이터베이스 오픈 API - https://www.kmdb.or.kr/main
       *
       * rest - http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml.jsp?collection=kmdb_new&detail=N&director=%EB%B0%95%EC%B0%AC%EC%9A%B1&ServiceKey=인증키값
       * key - 3M5U8T5PG7R74K1J2828
       */
      try {
        const response = await axios({
          method: 'get',
          url: `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json.jsp?collection=kmdb_new&detail=Y&listCount=10&query=${query}&createDts=2019&sort=prodYear&ServiceKey=3M5U8T5PG7R74K1J2828`
        });
        dispatch({
          type: 'KMDB_DATA',
          data: response.data,
          list: {
            rank: rank,
            data: response.data
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    koficDATA();
  }, []);
  console.log(
    state.list[0] && state.list[0].data.Data[0].Result[0].posters.split('|')
  );
  // console.log(state.list[0].data);
  return (
    <ul className='movie-list'>
      {state.list.map(item => (
        <li key={item.data.Data[0].Result[0].DOCID}>
          <a href='#'>
            <strong className='title'>{item.data.Query}</strong>
            <p className='cont'>{item.data.Data[0].Result[0].plot}</p>
            <div className='thumb'>
              {/* <img src={item.data.Data[0].Result[0].posters} alt='' /> */}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default App;
