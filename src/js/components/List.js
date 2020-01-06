import React, { useEffect } from 'react';
import Swiper from 'react-id-swiper';

function List({ daily, list, onDaily, onWeek }) {
  list = list.filter(item => item.overview.length !== 0);
  const params = {
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 15,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  return (
    <>
      <div className="l-wrap">
        <Swiper {...params}>
          {list.map(item => (
            <div key={item.id}>
              <a href="#">
                <div className="thumb">
                  <img src={item.posterImage} alt="" />
                </div>
              </a>
            </div>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default List;
