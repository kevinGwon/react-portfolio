import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import HeaderContainer from './containers/HeaderContainer';
import FooterContainer from './containers/FooterContainer';
import ListContainer from './containers/ListContainer';

// ACTION
import { LOADING } from './reducer/load';

function App() {
  // list reducer
  const { genres } = useSelector(store => store.list, []);

  // load reducer
  const { isLoading } = useSelector(store => store.load, []);

  // if (isLoading) return <Loading />;

  return (
    <>
      <HeaderContainer />

      <article className="movie-article">
        {/* Action */}
        <ListContainer
          category={genres.action.category}
          lists={genres.action}
        />

        {/* Thriller */}
        <ListContainer
          category={genres.thriller.category}
          lists={genres.thriller}
        />

        {/* Crime */}
        <ListContainer category={genres.crime.category} lists={genres.crime} />

        {/* War */}
        <ListContainer category={genres.war.category} lists={genres.war} />

        {/* Horror */}
        <ListContainer
          category={genres.horror.category}
          lists={genres.horror}
        />

        {/* Romance */}
        <ListContainer
          category={genres.romance.category}
          lists={genres.romance}
        />

        {/* Animation */}
        <ListContainer
          category={genres.animation.category}
          lists={genres.animation}
        />
      </article>

      <FooterContainer />
    </>
  );
}

export default App;
