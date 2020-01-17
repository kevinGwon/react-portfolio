import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

// Common
import Loading from './components/Loading';

// Page
import Home from './pages/Home';

function App() {
  const { isLoading } = useSelector(store => store.load, []);
  return (
    <>
      <Home />
      {isLoading && <Loading />}
    </>
  );
}

export default App;
