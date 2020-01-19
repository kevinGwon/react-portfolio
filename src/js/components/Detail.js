import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import StarRatings from 'react-star-ratings';
import { DETAIL_LOADING_ON, DETAIL_LOADING_OUT } from '@/reducer/detail';

function Detail({ movie }) {
  console.log('id length');
  useEffect(() => {
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
      swiper.destroy();
      swiper = null;
    };
  }, []);

  return (
    <article className="movie-article movie-article--detail">
      <header
        className="detail-header"
        style={{
          backgroundImage: `url(
            https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      >
        <h2 className="h1">
          {movie.title}
          {movie.title !== movie.original_title && (
            <span>({movie.original_title})</span>
          )}
        </h2>
      </header>
      <div className="l-wrap">
        <div className="l-detail">
          <ul className="detail-category">
            {movie.genres.map(item => (
              <li key={item.id} className="label">
                #{item.name}
              </li>
            ))}
          </ul>
          <div>
            <StarRatings
              rating={movie.vote_average / 2}
              numberOfStars={5}
              starDimension="20px"
              starSpacing="5px"
              starRatedColor="#e50914"
              name="rating"
            />
          </div>
          <p>{movie.release_date}</p>
          <p>{movie.overview}</p>
          {/* <div className="detail-video">
          <iframe
            src={`https://www.youtube.com/embed/${movie.videoArray[0].key}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div> */}
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {movie.similar.map(item => (
                <div key={item.id} className="swiper-slide">
                  <Link to={`/detail/${item.id}`}>
                    <div className="thumb">
                      <img
                        className="swiper-lazy"
                        data-src={
                          item.poster_path.indexOf('null') === -1
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
        </div>
      </div>
    </article>
  );
}

export default Detail;
