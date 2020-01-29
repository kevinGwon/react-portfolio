(global => {
  module.exports = global();
})(() => {
  let IG = {};
  window.onload = () => {
    // element
    IG.$app = document.getElementById('app');
    IG.$header = document.getElementById('header');
    IG.$footer = document.getElementById('footer');

    // init
    IG.EASE = 'Expo.easeOut';
    IG.DUR = 0.6;

    IG.scrollTop = 0;
    IG._scrollTop = 0;
    IG.scrolling = false;

    // requestAnimationFrame polyfill
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    IG.$win = window;

    requestAnimationFrame(setScroll);

    function setScroll() {
      IG._scrollTop = IG.scrollTop;
      IG.scrollTop = IG.$win.scrollY;

      if (IG._scrollTop === IG.scrollTop) {
        IG.scrolling = false;
      } else {
        IG.scrolling = true;
      }

      requestAnimationFrame(setScroll);
    }
  };
  return IG;
});
