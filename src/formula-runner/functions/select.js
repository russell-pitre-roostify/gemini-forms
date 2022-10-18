import {
  argumentsToArray,
  iterateFunction
} from './util';

const select = (...inputArgs) => iterateFunction(argumentsToArray(inputArgs), (switchValue) => {
  const args = argumentsToArray(inputArgs).slice(1);
  let result;
  if (Array.isArray(switchValue)) {
    return switchValue.map(function map(value) {
      return select.apply(this, [value].concat(args));
    }, this);
  }
  args.some((arg) => {
    if (!arg.value) {
      throw new Error('select case requires a "value" member');
    }
    if (arg.case === switchValue || !arg.case) {
      result = arg.value;
      return true;
    }
    return false;
  });
  return result;
});

select.id = 'select';
select.label = 'select(switchValue, {case: value, value: value}, ...)';
select.description = 'Switch-like statement, runs left to right, returns value when case value matches switch value.';
select.tags = ['switch', 'case'];
select.type = 'Identifier';

export default select;
