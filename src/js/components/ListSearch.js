import React from 'react';
import filterArray from '../modules/filterArray';
import { Link } from 'react-router-dom';
import LoadingCircle from './LoadingCircle';
import filterImages from '@/modules/filterImages';

function SearchList({ lists }) {
  // console.log(`5. state = ${lists.isLoading} [ListSearch.js]`);
  const searchList = filterArray(lists.list);
  return (
    <div className="l-wrap">
      {lists.isLoading ? (
        <ul className="search-list">
          {searchList.length !== 0 ? (
            searchList.map(item => (
              <li key={item.id}>
                <Link to={`/detail/${item.id}`}>
                  <div className="thumb">
                    <img
                      src={
                        filterImages(item.posterImage)
                          ? item.posterImage
                          : 'http://placehold.it/500x747?text=Preparing image'
                      }
                      alt=""
                    />
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="no-item">검색 결과가 없습니다</li>
          )}
        </ul>
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
}

SearchList.displayName = 'SearchList';

export default SearchList;
