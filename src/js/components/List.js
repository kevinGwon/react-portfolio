import React from 'react';

function List({ daily, list, onDaily, onWeek }) {
  console.log(list);
  return (
    <>
      <div className="l-wrap">
        <ul className="movie-list">
          {list.length > 0 &&
            list.map((item, i) => (
              <li
                key={
                  item.data.Data[0].Result
                    ? item.data.Data[0].Result[0].DOCID
                    : i
                }
              >
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
      </div>
    </>
  );
}

export default List;
