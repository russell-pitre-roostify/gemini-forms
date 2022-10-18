import { iterateFunction } from './util';
import str from './str';

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
