

// returns true if obj is an empty object
const objEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const utils = {
  objEmpty: (obj) => objEmpty(obj),
}

export default utils;
