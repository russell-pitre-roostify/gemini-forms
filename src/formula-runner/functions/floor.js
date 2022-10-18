import { iterateFunction } from './util';

const floor = value => iterateFunction([value], Math.floor);

floor.id = 'floor';
floor.label = 'floor(x)';
floor.description = 'Returns x, rounded down to the nearest integer';
floor.tags = [];

export default floor;
