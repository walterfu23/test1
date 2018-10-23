
// return true if x is whitespace only
const isBlank = (x) => {
  return  /^\s*$/.test(x);
}

// return true if x is empty or whitespace only: undefined, '', ' '
const emptyVal = (x) => {
  return ( x === void 0 ) || isBlank(x);
}

// compare two variables. If they are not empty
// and are the same, true will be returned.
const sameVals = (x, y) => {
  return (!emptyVal(x)) && (!emptyVal(y)) && (x === y);
}

// returns true if obj is undefined or an empty object
const objEmpty = (obj) => {
  return Object.keys(obj).length === 0 &&
    obj.constructor === Object;
}

const objEmptyOrig = (obj) => {
  if (emptyVal(obj)) {
    return true;
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

// case-insensitive compare two strings
const strCompare = (str1, str2) => {
  const str1Lower = str1.toLowerCase();
  const str2Lower = str2.toLowerCase();
  return str1Lower.localeCompare(str2Lower);
}

// clone an object and delete the given properties
// any empty properties are deleted as well.
const cloneDelProps = (objOrig, ...props) => {
  const objClone = Object.assign({}, objOrig);
  props.forEach(prop => {
    delete objClone[prop];
  });
  const objNoEmptyProps = cloneDelEmptyProps(objClone);
  return objNoEmptyProps;
}

// delete empty properties in the object
const cloneDelEmptyProps = (obj) => {
  const objClone = Object.assign({}, obj);
  for (const prop in objClone) {
    if (emptyVal(objClone[prop])) {
      delete objClone[prop];
    }
  }
  return objClone;
}

// these functions will be made known to potential callers
const utils = {
  cloneDelProps: (objOrig, ...props) => cloneDelProps(objOrig, ...props),
  emptyVal: (x) => emptyVal(x),
  objEmpty: (obj) => objEmpty(obj),
  sameVals: (x, y) => sameVals(x, y),
  strCompare: (str1, str2) => strCompare(str1, str2),
}

export default utils;
