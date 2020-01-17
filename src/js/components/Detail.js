import React from 'react';

function Detail({ match, movie }) {
  console.log(movie);
  return (
    <article className="movie-article movie-article--detail">
      <div className="movie-article--bg">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt=""
        />
      </div>
      <h2 className="h1">{movie.title}</h2>
      <p>{movie.overview}</p>
      <ul>
        {movie.genres.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <ul>
        {movie.videoArray.map(item => (
          <li key={item.id}>
            <iframe
              src={`https://www.youtube.com/embed/${item.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Detail;
