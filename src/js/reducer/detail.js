export const DETAIL_MOVIE = 'detail/DETAIL_MOVIE';
export const DETAIL_MOVIE_SIMILAR = 'detail/DETAIL_MOVIE_SIMILAR';
export const DETAIL_MOVIE_CAST = 'detail/DETAIL_MOVIE_CAST';
export const DETAIL_MOVIE_VIDEO = 'detail/DETAIL_MOVIE_VIDEO';
export const DETAIL_LOADING_ON = 'detail/DETAIL_LOADING_ON';
export const DETAIL_LOADING_OUT = 'detail/DETAIL_LOADING_OUT';
export const DETAIL_RESET = 'detail/DETAIL_RESET';

// ACTION
export const detailMovie = data => ({
  type: DETAIL_MOVIE,
  ...data,
});
export const detailMovieSimilar = data => ({
  type: DETAIL_MOVIE_SIMILAR,
  similar: data,
});
export const detailMovieCast = data => ({
  type: DETAIL_MOVIE_CAST,
  cast: data,
});
export const detailMovieVideo = data => ({
  type: DETAIL_MOVIE_VIDEO,
  videoArray: data,
});
export const detailLoadingOn = () => ({
  type: DETAIL_LOADING_ON,
});
export const detailLoadingOut = () => ({
  type: DETAIL_LOADING_OUT,
});
export const detailReset = () => ({
  type: DETAIL_RESET,
});

const initState = {
  isLoading: false,
  movie: {
    similar: [],
    cast: [],
    videoArray: [],
    backdrop_path: '',
    poster_path: '',
    vote_average: 0,
    release_date: '',
    title: '',
    genres: [],
  },
};

export default function global(state = initState, action) {
  switch (action.type) {
    case DETAIL_MOVIE:
      return {
        ...state,
        movie: {
          ...state.movie,
          ...action,
        },
      };
    case DETAIL_MOVIE_SIMILAR:
      return {
        ...state,
        movie: {
          ...state.movie,
          similar: action.similar,
        },
      };
    case DETAIL_MOVIE_CAST:
      return {
        ...state,
        movie: {
          ...state.movie,
          cast: action.cast,
        },
      };
    case DETAIL_MOVIE_VIDEO:
      return {
        ...state,
        movie: {
          ...state.movie,
          videoArray: action.videoArray,
        },
      };
    case DETAIL_LOADING_ON:
      return {
        ...state,
        isLoading: false,
      };
    case DETAIL_LOADING_OUT:
      return {
        ...state,
        isLoading: true,
      };
    case DETAIL_RESET:
      return {
        ...initState,
      };
    default:
      return state;
  }
}
