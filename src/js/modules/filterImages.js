const re = /null|undefined/g;

const filterImages = str => {
  if (str === null || str === undefined) {
    return false;
  }
  return str.search(re) === -1 ? true : false;
};

export default filterImages;
