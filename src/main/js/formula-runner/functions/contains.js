import { argumentsToArray } from './util.js';

const contains = (...inputArgs) => {

  if (!inputArgs) {
    return;
  }

  const arr = argumentsToArray(inputArgs[0]);
  const args = inputArgs.slice(1);
  const result = args.every(arg => (arg && arr.indexOf(arg) > -1));

  return result;
};

contains.id = 'contains';
contains.label = 'contains(array, value, value...)';
contains.description = 'Returns true if array contains all values.';
contains.tags = [];
contains.type = 'Identifier';

export default contains;
