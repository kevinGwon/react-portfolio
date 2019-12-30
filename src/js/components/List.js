import React from 'react';

function List({ list }) {
  return (
    <ul className='movie-list'>
      {list.map(item => (
        <li key={item.data.Data[0].Result[0].DOCID}>
          <a href='#'>
            <strong className='title'>{item.data.Query}</strong>
            <p className='cont'>{item.data.Data[0].Result[0].plot}</p>
            <div className='thumb'>
              <img src={item.data.Data[0].Result[0].posters} alt='' />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default List;
