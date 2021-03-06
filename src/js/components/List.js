import React from 'react';
import ListSwiper from './ListSwiper';
import ListSearch from './ListSearch';

function List({ lists }) {
  return (
    <>
      {lists.category !== 'search' ? (
        <ListSwiper lists={lists} />
      ) : (
        <ListSearch lists={lists} />
      )}
    </>
  );
}

List.displayName = 'List';

export default React.memo(List);
