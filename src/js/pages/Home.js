import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ListContainer from '../containers/ListContainer';
import ScrollMotion from '../animation/scroll';

// Thunk
import { onLoading } from '../reducer/load';

const scrollMotion = new ScrollMotion();

function Home({ $article }) {
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
        scrollMotion.init();
      }, 3000);
    }
    if (isSearch) {
      scrollMotion.runDestroyScroll();
    }
    if (!isLoading && !isSearch) {
      scrollMotion.init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch]);

  return (
    <>
      <article className="movie-article" ref={$article}>
        <div className={`movie-article-view ${isSearch ? 'is-search' : ''}`}>
          <div className="movie-section-box">
            <div className="movie-indicator" lang="en">
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
    </>
  );
}

export default Home;
