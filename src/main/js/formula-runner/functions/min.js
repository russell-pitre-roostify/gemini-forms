import {
  argumentsToArray,
  iterateFunction
} from './util.js';

const min = (...args) => iterateFunction(argumentsToArray(args), Math.min);

min.id = 'min';
min.label = 'min(x, y, z, ..., n)';
min.description = 'Returns the number with the lowest value';
min.tags = [];

export default min;
