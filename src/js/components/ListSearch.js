import React from 'react';
import filterArray from '../modules/filterArray';

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
                <div className="thumb">
                  <img
                    src={
                      item.posterImage.indexOf('null') === -1
                        ? item.posterImage
                        : 'http://placehold.it/500x747?text=Preparing image'
                    }
                    alt=""
                  />
                </div>
              </li>
            ))
          ) : (
            <li className="no-item">검색 결과가 없습니다</li>
          )}
        </ul>
      ) : (
        <div className="loading loading--circle" title="Loading">
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 50 50">
            <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
              <animateTransform
                attributeType="XML"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )}
    </div>
  );
}

export default SearchList;
