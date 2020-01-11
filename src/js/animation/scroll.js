const DOWN = 'DOWN';
const UP = 'UP';

let lastScrollTop = 0,
  dir = null,
  isScroll = false,
  index = 0;

const scrollMotion = e => {
  e.preventDefault();
  e.stopPropagation();
  const $target = document.querySelectorAll('section');

  let scrollTop =
    e.wheelDeltaY || e.pageYOffset || document.documentElement.scrollTop;
  if (isScroll) return;
  if (scrollTop > lastScrollTop) {
    runGetDir(UP);
    runGetIndex(UP, $target.length);
  } else {
    runGetDir(DOWN);
    runGetIndex(DOWN, $target.length);
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

const runGetDir = dir => {
  isScroll = true;
  console.log(dir);
  console.log(index);
  setTimeout(() => {
    isScroll = false;
  }, 1500);
};

const runGetIndex = (dir, length) => {
  if (dir === DOWN) {
    if (index === length) return false;
    index = index + 1;
  } else if (dir === UP) {
    if (index === 0) return false;
    index = index - 1;
  }
};

document.addEventListener('wheel', scrollMotion, { passive: false });
