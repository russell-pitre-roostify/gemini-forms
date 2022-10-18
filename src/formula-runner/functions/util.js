const getArgumentsLengths = (args) => {
  let arrayArgumentLength;
  const isValid = args.every((item) => {
    if (!Array.isArray(item)) return true;
    arrayArgumentLength = arrayArgumentLength || item.length;
    return item.length === arrayArgumentLength;
  });
  if (!isValid) throw new Error('Mismatched array argument lengths in formula runner');
  return arrayArgumentLength;
};

const runWithArrayArguments = (arrayLength, args, fn) => {
  const results = [];
  let currentArgs;

  function flattenArgs(arg, i) {
    if (Array.isArray(arg)) return arg[i];
    return arg;
  }

  for (let i = 0; i < arrayLength; i++) {
    currentArgs = args.map(arg => flattenArgs(arg, i));
    results.push(fn(...currentArgs));
  }
  return results;
};

export const argumentsToArray = (args) => {
  if (args.length === 1 && Array.isArray(args[0])) return args[0];

  const result = [];
  for (let i = 0; i < args.length; i++) result.push(args[i]);
  return result;
};

export const iterateFunction = (args, fn) => {
  const arrayLength = getArgumentsLengths(args);
  if (arrayLength) {
    return runWithArrayArguments(arrayLength, args, fn);
  }
  return fn(...args);
};
