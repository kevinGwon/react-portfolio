import {
  // ACTION
  loadingOut,
} from '../reducer/load';

export const reveal = () => dispatch => {
  const $app = document.querySelector('#app');
  const $article = $app.querySelector('.movie-article');

  dispatch(loadingOut());
  $app.classList.remove('is-loading');

  if ($article === null) return;

  TweenMax.from($app.querySelector('.movie-article'), IG.DUR * 3, {
    delay: IG.DUR,
    ease: IG.EASE,
    autoAlpha: 0,
    y: 100,
    clearProps: 'all',
  });
};
