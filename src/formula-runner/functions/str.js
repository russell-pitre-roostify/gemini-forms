import { iterateFunction } from './util';

const str = value => iterateFunction([value], val => String(val));

str.id = 'str';
str.label = 'str(any)';
str.description = 'Converts argument to a string. Works on array children.';
str.tags = ['convert', 'string'];
str.type = 'Identifier';

export default str;
