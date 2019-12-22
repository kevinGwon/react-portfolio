import React, { useEffect } from 'react';
import axios from 'axios';
import 'babel-polyfill';

function App() {
  let obj;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://dapi.kakao.com/v2/search/cafe',
          params: {
            query: '스타벅스'
          },
          headers: {Authorization: 'KakaoAK 495cb1c9a9abaf3fd3f125c586f009d1'}
        });
        console.log(response);
        // console.log(obj);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, [obj]);
  return (
    <div>
    </div>
  );
}

export default App;
