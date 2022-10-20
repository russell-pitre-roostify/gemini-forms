import { argumentsToArray } from './util.js';

const sum = (...args) => {

  const arr = argumentsToArray(args);

  return arr.reduce((acc, val) => {
    if (!acc) {
      return val;
    }
    return val ? acc + val : acc;
  }, 0);
};

sum.id = 'sum';
sum.label = 'sum(array)';
sum.description = 'Adds all members of an array using "+"';
sum.tags = ['add'];
sum.type = 'Identifier';

export default sum;
