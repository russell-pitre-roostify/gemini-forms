import { iterateFunction } from './util';

const num = value => iterateFunction([value], val => Number(val));

num.id = 'num';
num.label = 'num(any)';
num.description = 'Converts argument to number. Works on array children.';
num.tags = ['convert', 'number'];
num.type = 'Identifier';

export default num;
