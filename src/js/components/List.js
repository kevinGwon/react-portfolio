import React, { useEffect } from 'react';
import ListSwiper from './ListSwiper';
import ListSearch from './ListSearch';

function List({ lists }) {
  return (
    <>
      {lists.category !== 'search' && <ListSwiper lists={lists} />}
      {lists.category === 'search' && <ListSearch lists={lists} />}
    </>
  );
}

export default List;
