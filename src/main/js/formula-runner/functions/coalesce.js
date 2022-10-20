import {
  argumentsToArray,
  iterateFunction
} from './util.js';

const coalesce = (...outerArgs) => {
  return iterateFunction(argumentsToArray(outerArgs), (...innerArgs) => {
    const args = argumentsToArray(innerArgs);

    let result = null;

    args.some((arg) => {
      if (arg) {
        result = arg;
        return true;
      }
    });
    return result;
  });
};

coalesce.id = 'coalesce';
coalesce.label = 'coalesce(value, ...)';
coalesce.description = 'Returns first value that isn\'t false, "", 0, or null';
coalesce.tags = [''];
coalesce.type = 'Identifier';

export default coalesce;
