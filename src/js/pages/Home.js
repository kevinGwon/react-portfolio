import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import List from './List';
import Detail from './Detail';

function Home() {
  return (
    <>
      <Router>
        <Route path="/" exact component={List} />
        <Route path="/detail/:id" component={Detail} />
      </Router>
    </>
  );
}

export default Home;
