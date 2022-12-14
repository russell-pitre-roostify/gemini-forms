import { iterateFunction } from './util.js';
import str from './str.js';

const toLowerCase = value => iterateFunction(
  [value],
  val => str(val).toLowerCase()
);

toLowerCase.id = 'toLowerCase';
toLowerCase.label = 'toLowerCase(value)';
toLowerCase.description = 'Converts string to lower case.';
toLowerCase.tags = [];
toLowerCase.type = 'Identifier';

export default toLowerCase;
