import {
  argumentsToArray,
  iterateFunction
} from './util';

const max = (...args) => iterateFunction(argumentsToArray(args), Math.max);

max.id = 'max';
max.label = 'max(x, y, z, ..., n)';
max.description = 'Returns the number with the highest value';
max.tags = [];

export default max;
