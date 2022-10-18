import { iterateFunction } from './util';
import str from './str';

const toUpperCase = value => iterateFunction(
  [value],
  val => str(val).toUpperCase()
);

toUpperCase.id = 'toUpperCase';
toUpperCase.label = 'toUpperCase(value)';
toUpperCase.description = 'Converts string to upper case.';
toUpperCase.tags = [];
toUpperCase.type = 'Identifier';

export default toUpperCase;
