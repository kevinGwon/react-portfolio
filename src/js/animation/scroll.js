class ScrollMotion {
  constructor() {
    this.DOWN = 'DOWN';
    this.UP = 'UP';
    this.isActive = 'is-active';
    this.isAnimated = 'is-animated';
    this.lastScrollTop = 0;
    this.dir = null;
    this.isMove = false;
    this.index = 0;
    this.sectionLength = 0;
    this.eventMap = {};
    this.eventWheel = 'wheel.onWheel';
    this.$sectionBox = null;
    this.$section = null;
    this.$indicatorBtn = null;
  }

  init() {
    if (this.$section === null) {
      this.$sectionBox = document.querySelector('.movie-section-box');
      this.$section = this.$sectionBox.querySelectorAll('section');
      this.$indicatorBtn = this.$sectionBox.querySelectorAll(
        '.movie-indicator button',
      );
      this.sectionLength = this.$section.length - 1;

      setTimeout(() => {
        this.$sectionBox.classList.add('is-loaded');
        this.$section[0].classList.add(this.isActive);
        this.$indicatorBtn[0].classList.add(this.isActive);
      }, 1000);
    }
    this.runIndicator();
    this.runAddScroll();
  }

  runAddScroll() {
    this.eventMap[this.eventWheel] = this.runScroll.bind(this);
    document.addEventListener('wheel', this.eventMap[this.eventWheel], {
      passive: false,
    });
  }

  runDestroyScroll(e) {
    console.log('runDestroyScroll');
    document.removeEventListener('wheel', this.eventMap[this.eventWheel]);
    delete this.eventMap[this.eventWheel];
  }

  runScroll(e) {
    e.preventDefault();
    e.stopPropagation();

    let dirValue = e.wheelDelta / 120 || e.deltaY / -120;
    this.dir = !(dirValue > 0) ? this.DOWN : this.UP;
    this.runGetDir(this.dir);
  }

  runOnlock() {
    setTimeout(() => {
      this.isMove = false;
    }, 1200);
  }

  runGetDir(dir) {
    if (this.isMove) return;
    this.runDetect(dir);
  }

  runDetect(dir) {
    dir === this.UP ? --this.index : ++this.index;

    if (this.index <= 0) {
      this.index = 0;
    } else if (this.index >= this.sectionLength) {
      this.index = this.sectionLength;
    }

    this.runMoveTo(dir);
  }

  runAddClass(dir) {
    for (let i = 0; i <= this.sectionLength; i++) {
      if (
        this.index === 0 &&
        this.$section[0].classList.contains(this.isActive)
      ) {
        this.runOnlock();
        return;
      }

      if (
        this.index === this.sectionLength &&
        this.$section[this.sectionLength].classList.contains(this.isActive)
      ) {
        this.runOnlock();
        return;
      }

      if (this.$section[i].classList.contains(this.isActive)) {
        // Active section
        this.$section[i].classList.remove(this.isActive);
        // Active indicator
        this.$indicatorBtn[i].classList.remove(this.isActive);

        if (dir !== 0 && dir === this.UP) {
          this.$section[i - 1].classList.remove(this.isAnimated);
        }
      }
    }

    // Active indicator
    this.$indicatorBtn[this.index].classList.add(this.isActive);
    // Active section
    this.$section[this.index].classList.add(this.isActive);

    if (dir === this.DOWN) {
      if (dir === 0) return;
      this.$section[this.index - 1].classList.add(this.isAnimated);
    }
  }

  runMoveTo(dir) {
    this.isMove = true;

    console.log(`${this.index} / ${this.sectionLength}`);
    this.runAddClass(dir);
    this.runOnlock();
  }

  runIndicator() {
    for (let i = 0; i <= this.$indicatorBtn.length - 1; i++) {
      this.$indicatorBtn[i].addEventListener('click', () => {
        this.index = i;
        this.runMoveTo();
      });
    }
  }
}

export default ScrollMotion;

// console.log('isSeach = ' + isSearch);
// document.addEventListener('wheel', runScroll, {
// passive: false,
// });
