import { iterateFunction } from './util.js';

const ceil = value => iterateFunction([value], Math.ceil);

ceil.id = 'ceil';
ceil.label = 'ceil(x)';
ceil.description = 'Returns x, rounded upwards to the nearest integer';
ceil.tags = [];

export default ceil;
