let lastScrollTop = 0,
  dir = null;

const scrollMotion = e => {
  e.preventDefault();
  e.stopPropagation();
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    runGetDir('down');
  } else {
    runGetDir('up');
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

const runGetDir = dir => {
  console.log(dir);
};

document.addEventListener('wheel', scrollMotion, { passive: false });
