import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';

function Detail({ match, movie }) {
  console.log(movie);
  useEffect(() => {
    let swiper = null;
    swiper = new Swiper('.swiper-container', {
      lazy: true,
      parallax: true,
      centeredSlides: false,
      slidesPerView: 3.5,
      spaceBetween: 20,
      grabCursor: true,
      speed: 800,
      breakpoints: {
        1024: { slidesPerView: 5.5 },
      },
    });
    return () => {
      swiper.destroy();
      swiper = null;
    };
  }, [movie]);
  return (
    <article className="movie-article movie-article--detail">
      <header
        className="movie-header"
        style={{
          backgroundImage: `url(
            https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      >
        <h2 className="h1">
          {movie.title}
          <span>({movie.original_title})</span>
        </h2>
      </header>
      <div className="l-wrap">
        <p>{movie.vote_average}</p>
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
        <ul>
          {movie.genres.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
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
        {/* <ul>
          {movie.videoArray.map((item, index) => {
            if (index > 2) return;
            return (
              <li key={item.id}>
                <iframe
                  src={`https://www.youtube.com/embed/${item.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </li>
            );
          })}
        </ul> */}
      </div>
    </article>
  );
}

export default Detail;
