import React from 'react';

function SearchList({ lists }) {
  return (
    <div className="l-wrap">
      <ul className="search-list">
        {lists.list.length !== 0 ? (
          lists.list.map(item => (
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
    </div>
  );
}

export default SearchList;
