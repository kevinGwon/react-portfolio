import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './List';
import Detail from './Detail';

import HeaderContainer from '../containers/HeaderContainer';
import FooterContainer from '../containers/FooterContainer';

function Home() {
  return (
    <>
      <Router>
        <HeaderContainer />
        <div className="movie-article-wrap">
          <Route path="/" exact component={List} />
          <Route path="/detail/:id" component={Detail} />
        </div>
        <FooterContainer />
      </Router>
    </>
  );
}

export default Home;
