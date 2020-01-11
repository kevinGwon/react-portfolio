const DOWN = 'DOWN';
const UP = 'UP';

const scrollMotion = () => {
  let lastScrollTop = 0,
    dir = null,
    isMove = false,
    index = 0;

  const $section = document.querySelectorAll('section');

  const scrollMotion = e => {
    e.preventDefault();
    e.stopPropagation();

    let dirValue = e.wheelDelta / 120 || e.deltaY / -120;

    dir = !(dirValue > 0) ? DOWN : UP;
    runGetDir(dir);
  };

  const runGetDir = dir => {
    if (isMove) return;
    runDetect(dir);
  };

  const runDetect = (dir, length) => {
    dir === UP ? --index : ++index;

    if (index < 0) {
      index = 0;
    } else if (index > $section.length) {
      index = $section.length;
    }

    runMoveTo({ dir, index });
  };

  const runMoveTo = obj => {
    isMove = true;
    console.log(obj.dir);
    console.log(obj.index);

    setTimeout(() => {
      isMove = false;
    }, 500);
  };

  document.addEventListener('wheel', scrollMotion, { passive: false });
};

export default scrollMotion;
