import _round from 'lodash/round';

const round = (number, precision = 0) => _round(number, precision);

round.id = 'round';
round.label = 'round(x, y)';
round.description = 'Rounds a number x to a specified y number of digits';
round.tags = [];

export default round;
