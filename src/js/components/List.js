import React from 'react';

function List({ list }) {
  // 순서 정렬
  list.length === 10 &&
    list.sort((prev, next) => {
      if (parseInt(prev.rank, 10) > parseInt(next.rank, 10)) {
        return 1;
      }
      if (parseInt(prev.rank, 10) < parseInt(next.rank, 10)) {
        return -1;
      }
      return 0;
    });
  console.log(list);
  return (
    <ul className='movie-list'>
      {list.map(item => (
        <li key={item.data.Data[0].Result[0].DOCID}>
          <a href='#'>
            <div className='thumb'>
              <img
                src={item.data.Data[0].Result[0].posters.split('|')[0]}
                alt=''
              />
            </div>
            <strong className='title'>{item.data.Query}</strong>
            <p className='cont'>{item.data.Data[0].Result[0].plot}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default List;
