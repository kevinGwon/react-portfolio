import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import HeaderContainer from './containers/HeaderContainer';
import FooterContainer from './containers/FooterContainer';
import ListContainer from './containers/ListContainer';
import ScrollMotion from './animation/scroll';

// Thunk
import { onLoading } from './reducer/load';

// ACTION
import { LOADING } from './reducer/load';

const scrollMotion = new ScrollMotion();

function App() {
  const dispatch = useDispatch();

  // list reducer
  const { genres } = useSelector(store => store.list, []);

  // load reducer
  const { isLoading, isSearch } = useSelector(store => store.load, []);

  useEffect(() => {
    dispatch(onLoading(genres));
  }, [dispatch, genres]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        console.log('isLoading');
        scrollMotion.init();
      }, 3000);
    }
    if (isSearch) {
      console.log('isSearch');
      scrollMotion.runDestroyScroll();
    }
    if (!isLoading && !isSearch) {
      console.log('isLoading && isSearch');
      scrollMotion.init();
    }
  }, [isLoading, isSearch]);

  return (
    <>
      <HeaderContainer />

      <article className="movie-article">
        <div className={`movie-article-view ${isSearch ? 'is-search' : ''}`}>
          <div className="movie-section-box">
            <div className="movie-indicator">
              {Object.keys(genres).map(
                itemKey =>
                  itemKey !== 'search' && (
                    <button type="button" key={genres[itemKey].category}>
                      {genres[itemKey].category}
                    </button>
                  ),
              )}
            </div>

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
            <ListContainer
              category={genres.crime.category}
              lists={genres.crime}
            />

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
          </div>
          {isSearch && (
            <div className="movie-section-box movie-section-box--search">
              <ListContainer
                category={genres.search.category}
                lists={genres.search}
              />
            </div>
          )}
        </div>
      </article>
      <FooterContainer />
      {isLoading && <Loading />}
    </>
  );
}

export default App;
