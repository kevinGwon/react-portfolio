import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

// Common
import Loading from './components/Loading';

// Page
import HomePage from './pages/HomePage';

function App() {
  const { isLoading } = useSelector(store => store.load, []);
  return (
    <>
      <HomePage />
      {isLoading && <Loading />}
    </>
  );
}

export default App;
