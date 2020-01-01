import React from 'react';

function List({ daily, list, onDaily, onWeek }) {
  // 순서 정렬
  if (list.length === 10) {
    list.sort((prev, next) => {
      if (parseInt(prev.rank, 10) > parseInt(next.rank, 10)) {
        return 1;
      }
      if (parseInt(prev.rank, 10) < parseInt(next.rank, 10)) {
        return -1;
      }
      return 0;
    });
    list.map(item => {
      if (
        item.data.Data[0].Result !== undefined &&
        item.data.Data[0].Result.length > 1
      ) {
        return item.data.Data[0].Result.reverse();
      }
      return item;
    });
  }

  return (
    <>
      <ul className="movie-list">
        {list.length > 0 &&
          list.map(item => (
            <li key={item.rank}>
              <a href="#">
                <div className="thumb">
                  {item.data.Data[0].Result ? (
                    <img
                      src={item.data.Data[0].Result[0].posters.split('|')[0]}
                      alt=""
                    />
                  ) : (
                    <img
                      src="http://placehold.it/320x400?text=Preparing image"
                      alt=""
                    />
                  )}
                </div>
                <strong className="title">{item.data.Query}</strong>
                <p className="cont">
                  {item.data.Data[0].Result
                    ? item.data.Data[0].Result[0].plot
                    : '내용 준비중'}
                </p>
              </a>
            </li>
          ))}
      </ul>
    </>
  );
}

export default List;
