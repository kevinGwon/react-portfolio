import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import widthScrollMotion from '../hoc/withScrollMotion';
import ListContainer from '../containers/ListContainer';

// Thunk
import { onLoading } from '../reducer/global';

function ListPage({ scrollMotion }) {
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
    dispatch(onLoading({ genres }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        scrollMotion.init();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Detail 페이지에서 Search화면으로 이동시 scrollMotion 해제
    if (isDetail === false && isSearch === false && scrollMotion.isDestroy) {
      scrollMotion.init();
      return;
    }
    if (isSearch) {
      scrollMotion.destroy();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetail, isSearch]);

  return (
    <>
      <article
        className={`movie-article ${
          !isSearch ? 'movie-article--home' : 'movie-article--search'
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

ListPage.displayName = 'ListPage';

export default widthScrollMotion(React.memo(ListPage));
