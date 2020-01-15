import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

// Common
import Loading from './components/Loading';
import HeaderContainer from './containers/HeaderContainer';
import FooterContainer from './containers/FooterContainer';

// Page
import Home from './pages/Home';

function App() {
  const { isLoading } = useSelector(store => store.load, []);
  const $article = useRef();

  return (
    <>
      <HeaderContainer $article={$article} />
      <Home $article={$article} />
      <FooterContainer />
      {isLoading && <Loading />}
    </>
  );
}

export default App;
