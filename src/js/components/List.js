import React, { useEffect } from 'react';
import Swiper from 'swiper';

function List({ lists }) {
  useEffect(() => {
    setTimeout(() => {
      let swiper = new Swiper(`.swiper-container-${lists.category}`, {
        effect: 'coverflow',
        lazy: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 5,
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
      });
    }, 0);
  }, [lists.category]);
  return (
    <>
      <div className={`swiper-container swiper-container-${lists.category}`}>
        <div className="swiper-wrapper">
          {lists.list.map(item => (
            <div key={item.id} className="swiper-slide">
              <a href="#">
                <div className="thumb">
                  <img
                    data-src={
                      item.posterImage.indexOf('null') === -1
                        ? item.posterImage
                        : 'http://placehold.it/500x747?text=Preparing image'
                    }
                    className="swiper-lazy"
                    alt=""
                  />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="swiper-pagination"></div>

        {/* Arrow */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </>
  );
}

export default List;
