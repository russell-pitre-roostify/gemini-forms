import { iterateFunction } from './util.js';
import str from './str.js';

const trim = value => iterateFunction([value], val => str(val).trim());

trim.id = 'trim';
trim.label = 'trim(value)';
trim.description = 'Trims whitespace from the start and end of a string';
trim.tags = [];
trim.type = 'Identifier';

export default trim;
