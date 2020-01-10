import React from 'react';

function SearchList({ lists }) {
  return (
    <div className="l-wrap">
      <ul>
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
          <div>검색 결과가 없습니다</div>
        )}
      </ul>
    </div>
  );
}

export default SearchList;
