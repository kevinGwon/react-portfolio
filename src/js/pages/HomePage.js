import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ListPage from './ListPage';
import DetailPage from './DetailPage';

import HeaderContainer from '../containers/HeaderContainer';
import FooterContainer from '../containers/FooterContainer';

function HomePage() {
  return (
    <>
      <Router>
        <HeaderContainer />
        <main id="main" className="main">
          <div className="movie-article-wrap">
            <Route path="/" exact component={ListPage} />
            <Route path="/detail/:id" component={DetailPage} />
          </div>
        </main>
        <FooterContainer />
      </Router>
    </>
  );
}

ListPage.displayName = 'RouteListPage';
DetailPage.displayName = 'RouteDetailPage';

export default React.memo(HomePage);
