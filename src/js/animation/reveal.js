import { LOADING_OUT } from '../reducer/load';

export const reveal = () => dispatch => {
  const $app = document.querySelector('#app');

  dispatch({ type: LOADING_OUT });
  $app.classList.remove('is-loading');

  TweenMax.from($app.querySelector('.movie-article'), IG.DUR * 3, {
    delay: IG.DUR,
    ease: IG.EASE,
    autoAlpha: 0,
    y: 100,
    clearProps: 'all',
  });
};
