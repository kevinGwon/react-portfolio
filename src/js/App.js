import React from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from './containers/HeaderContainer';
import ListContainer from './containers/ListContainer';

// CATEGORY
import { POPULARITY, AVERAGE } from './reducer/list';

function App() {
  const { lists } = useSelector(store => store.list, []);
  return (
    <>
      <HeaderContainer />

      <div className="article">
        <div className="l-wrap">
          <h2>인기 영화</h2>
          <ListContainer category={POPULARITY} lists={lists.popularity} />

          <h2>높은 평점</h2>
          <ListContainer category={AVERAGE} lists={lists.average} />
        </div>
      </div>
    </>
  );
}

export default App;
