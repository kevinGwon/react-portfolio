import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import ListContainer from '../containers/ListContainer';
import ScrollMotion from '../animation/scroll';

// Thunk
import { onLoading } from '../reducer/global';

const scrollMotion = new ScrollMotion();

function List({ $article }) {
  const dispatch = useDispatch();

  // global reducer
  const { isSearch } = useSelector(store => store.global, shallowEqual);

  // list reducer
  const { genres } = useSelector(store => store.list, shallowEqual);

  // load reducer
  const { isLoading, isDetail } = useSelector(
    store => store.load,
    shallowEqual,
  );

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
      return;
    }
    if ((!isLoading && !isSearch) || (!isLoading && !isDetail)) {
      console.log(`Detail[List Page]= ${isDetail}`);
      scrollMotion.init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      scrollMotion.runDestroyScroll();
    };
  }, [isLoading, isSearch, isDetail]);

  return (
    <>
      <article
        className={`article movie-article ${
          isSearch ? 'movie-article--search' : ''
        }`}
      >
        <div className="movie-article-view">
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

export default List;
