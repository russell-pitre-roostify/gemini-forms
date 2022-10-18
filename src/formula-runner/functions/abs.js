import { iterateFunction } from './util';

const abs = value => iterateFunction([value], Math.abs);

abs.id = 'abs';
abs.label = 'abs(x)';
abs.description = 'Returns the absolute value of x';
abs.tags = [];

export default abs;
