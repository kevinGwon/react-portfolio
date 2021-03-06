import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper/dist/js/swiper';
import StarRatings from 'react-star-ratings';
import filterImages from '@/modules/filterImages';

function Detail({ movie, error, scrollToUp }) {
  useEffect(() => {
    if (!movie.similar.length) return;
    let swiper = null;
    swiper = new Swiper('.swiper-container', {
      lazy: true,
      parallax: true,
      centeredSlides: false,
      slidesPerView: 3.5,
      spaceBetween: 10,
      grabCursor: true,
      speed: 800,
      breakpoints: {
        1024: {
          slidesPerView: 5.2,
        },
      },
    });
    return () => {
      if (!movie.similar.length) return;
      swiper.destroy();
      swiper = null;
    };
  }, [movie.similar.length]);

  console.log(`Detail[ ----- ${movie.title ? movie.title : 'null'} ----- ]`);

  return error === null ? (
    <article className="movie-article movie-article--detail">
      <h2 className="a11y">영화정보 상세페이지</h2>
      <div
        className="detail-cover"
        style={{
          backgroundImage: filterImages(movie.backdrop_path)
            ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
            : 'url("http://placehold.it/3840x2160?text=Not Found")',
        }}
      ></div>
      <section className="detail-section">
        <div className="l-wrap">
          <div className="l-detail">
            <header className="detail-header">
              <div className="detail-header-inner">
                <div className="detail-img">
                  <img
                    src={
                      filterImages(movie.poster_path)
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'http://placehold.it/500x747?text=Not Found'
                    }
                    alt=""
                  />
                  <div className="detail-star-ratings">
                    <StarRatings
                      rating={movie.vote_average / 2}
                      numberOfStars={5}
                      starDimension="12px"
                      starSpacing="2px"
                      starRatedColor="#e50914"
                      name="rating"
                    />
                  </div>
                </div>
                <div className="detail-info">
                  <div className="detail-date">{movie.release_date}</div>
                  <h2 className="detail-h">{movie.title}</h2>
                  <ul className="detail-category">
                    {movie.genres.map(item => (
                      <li key={item.id}>#{item.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </header>
            {/* <div className="detail-video">
          <iframe
            src={`https://www.youtube.com/embed/${movie.videoArray[0].key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div> */}
            <div className="detail-contents">
              <h3 className="h5">줄거리</h3>
              <p className="detail-p">
                {movie.overview ? movie.overview : '등록된 줄거리가 없습니다.'}
              </p>
              <h3 className="h5">출연자</h3>
              <ul className="detail-cast">
                {movie.cast.length
                  ? movie.cast.map((item, index) => {
                      if (index > 9) return;
                      return (
                        <li key={item.credit_id}>
                          <div className="circle-wrap">
                            <img
                              src={
                                filterImages(item.profile_path)
                                  ? `https://image.tmdb.org/t/p/w100_and_h100_bestv2/${item.profile_path}`
                                  : '/images/no-image.png'
                              }
                              alt=""
                            />
                          </div>
                          <span>{item.name}</span>
                        </li>
                      );
                    })
                  : '등록된 출연자가 없습니다.'}
              </ul>
              {movie.similar.length !== 0 && (
                <>
                  <h3 className="h5">추천영화</h3>
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {movie.similar.map(item => (
                        <div key={item.id} className="swiper-slide">
                          <Link to={`/detail/${item.id}`} onClick={scrollToUp}>
                            <div className="thumb">
                              <img
                                className="swiper-lazy"
                                data-src={
                                  filterImages(item.poster_path)
                                    ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                                    : 'http://placehold.it/500x747?text=Not Found'
                                }
                                alt=""
                              />
                              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  ) : (
    <article className="movie-article movie-article--detail movie-article--error">
      <h2 className="a11y">영화정보 상세페이지</h2>
      <section className="detail-section">
        <div className="l-wrap">
          <div className="l-detail">
            <header className="detail-header">
              <h3 className="detail-h">등록된 영화정보가 없습니다.</h3>
            </header>
          </div>
        </div>
      </section>
    </article>
  );
}

Detail.displayName = 'Detail';

export default React.memo(Detail);
