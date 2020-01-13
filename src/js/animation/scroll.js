const DOWN = 'DOWN';
const UP = 'UP';
const isActive = 'is-active';
const isAnimated = 'is-animated';

let $sectionBox = null;
let $section = null;
let $indicatorBtn = null;

const scrollMotion = isSearch => {
  let lastScrollTop = 0,
    dir = null,
    isMove = false,
    index = 0,
    sectionLength = 0;

  if ($section === null) {
    $sectionBox = document.querySelector('.movie-section-box');
    $section = $sectionBox.querySelectorAll('section');
    $indicatorBtn = $sectionBox.querySelectorAll('.movie-indicator button');
    sectionLength = $section.length - 1;

    setTimeout(() => {
      $sectionBox.classList.add('is-loaded');
      $section[0].classList.add(isActive);
    }, 1000);
  }

  const scrollMotion = e => {
    e.preventDefault();
    e.stopPropagation();

    if (isSearch) {
      console.log('Remove wheel');
      // console.log(e.view.removeEventListener('wheel', scrollMotion));
    }

    let dirValue = e.wheelDelta / 120 || e.deltaY / -120;

    dir = !(dirValue > 0) ? DOWN : UP;
    runGetDir(dir);
  };

  const runOnlock = () => {
    setTimeout(() => {
      isMove = false;
    }, 500);
  };

  const runGetDir = dir => {
    if (isMove) return;
    runDetect(dir);
  };

  const runDetect = dir => {
    dir === UP ? --index : ++index;

    if (index <= 0) {
      index = 0;
    } else if (index >= sectionLength) {
      index = sectionLength;
    }

    runMoveTo({ dir, index });
  };

  const runAddClass = obj => {
    for (let i = 0; i <= sectionLength; i++) {
      if (obj.index === 0 && $section[0].classList.contains(isActive)) {
        runOnlock();
        return;
      }

      if (
        obj.index === sectionLength &&
        $section[sectionLength].classList.contains(isActive)
      ) {
        runOnlock();
        return;
      }

      if ($section[i].classList.contains(isActive)) {
        // Active section
        $section[i].classList.remove(isActive);
        // Active indicator
        $indicatorBtn[i].classList.remove(isActive);

        if (obj.dir !== 0 && obj.dir === UP) {
          $section[i - 1].classList.remove(isAnimated);
        }
      }
    }

    // Active indicator
    $indicatorBtn[obj.index].classList.add(isActive);
    // Active section
    $section[obj.index].classList.add(isActive);

    if (obj.dir === DOWN) {
      if (obj.dir === 0) return;
      $section[obj.index - 1].classList.add(isAnimated);
    }
  };

  const runMoveTo = obj => {
    isMove = true;

    console.log(`${obj.index} / ${sectionLength}`);
    runAddClass({ ...obj });
    runOnlock();
  };

  const runIndicator = () => {
    for (let i = 0; i <= $indicatorBtn.length - 1; i++) {
      $indicatorBtn[i].addEventListener('click', () => {
        index = i;
        runMoveTo({ index });
      });
    }
  };

  runIndicator();
  console.log('isSeach = ' + isSearch);
  document.addEventListener('wheel', scrollMotion, {
    passive: false,
  });
};

export default scrollMotion;
