import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { koficData, kmdbData } from '../modules/list';
import List from '../components/List';

function ListContainer() {
  const dispatch = useDispatch();
  const { query, list } = useSelector(
    state => ({
      query: state.list.query,
      list: state.list.list
    }),
    []
  );

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
        query.map(item => kmdbDATA(item.query, item.rank));
      } catch (error) {
        console.log(error);
      }
    };
    const kmdbDATA = async (queryItem, rank) => {
      /*
       * 한국영화데이터베이스 오픈 API - https://www.kmdb.or.kr/main
       *
       * rest - http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml.jsp?collection=kmdb_new&detail=N&director=%EB%B0%95%EC%B0%AC%EC%9A%B1&ServiceKey=인증키값
       * key - 3M5U8T5PG7R74K1J2828
       */
      try {
        const response = await axios({
          method: 'get',
          url: `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json.jsp?collection=kmdb_new&detail=Y&listCount=10&query=${queryItem}&createDts=2019&sort=prodYear&ServiceKey=3M5U8T5PG7R74K1J2828`
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
  }, [dispatch]);
  return <List list={list} />;
}

export default ListContainer;
