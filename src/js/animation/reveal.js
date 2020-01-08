import { LOADING_OUT } from '../reducer/load';

export const reveal = () => dispatch => {
  dispatch({ type: LOADING_OUT });
  IG.$app.classList.remove('is-loading');
  TweenMax.from(IG.$app.querySelector('.movie-article'), IG.DUR * 3, {
    delay: IG.DUR,
    ease: IG.EASE,
    autoAlpha: 0,
    y: 100,
  });
};
