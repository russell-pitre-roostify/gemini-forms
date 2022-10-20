import { iterateFunction } from './util.js';

const val = input => iterateFunction([input], (value) => {
  const number = parseFloat(value);
  if (!Number.isNaN(number)) {
    return number;
  }
  switch (value) {
    case 'null':
      return null;
    case 'undefined':
      return undefined;
    case 'NaN':
      return Number.NaN;
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return value;
  }
});

val.id = 'val';
val.label = 'val(any)';
val.description = 'Tries to parse string to number, bool, or native type. Works on array children.';
val.tags = ['convert', 'value'];
val.type = 'Identifier';

export default val;
