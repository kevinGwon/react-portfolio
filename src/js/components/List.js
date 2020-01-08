import React, { useEffect } from 'react';
import Swiper from 'swiper';
import Loading from './Loading';

function List({ lists }) {
  useEffect(() => {
    setTimeout(() => {
      const swiper = new Swiper(`.swiper-container-${lists.category}`, {
        lazy: true,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 5,
        grabCursor: true,
        parallax: true,
        speed: 800,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 50, // Slide rotate in degrees
          stretch: 0, // Stretch space between slides (in px)
          depth: 100, // Depth offset in px (slides translate in Z axis)
          modifier: 1, // Effect multipler
          slideShadows: true, // Enables slides shadows
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }, 500);
  }, [lists.category, lists.isLoading]);
  return (
    <>
      <section className="movie-section">
        <div
          className="movie-section-bg"
          style={
            lists.list[0] && {
              backgroundImage: `url('${lists.list[0].bgImage}')`,
            }
          }
        ></div>
        <div className="l-wrap">
          <h2 className="h1">
            {lists.category === 'action' && '액션'}
            {lists.category === 'thriller' && '스릴러'}
            {lists.category === 'crime' && '범죄'}
            {lists.category === 'war' && '전쟁'}
            {lists.category === 'horror' && '공포'}
            {lists.category === 'romance' && '로맨스'}
            {lists.category === 'animation' && '애니메이션'}
          </h2>
          <div
            className={`swiper-container swiper-container-${lists.category}`}
          >
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
                      <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
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
        </div>
      </section>
    </>
  );
}

export default List;
