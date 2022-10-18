const avg = arr => ((arr.length === 0) ? 0 : arr.reduce((acc, val) => acc + val, 0) / arr.length);

avg.id = 'avg';
avg.label = 'avg(array)';
avg.description = 'Averages all members of an array using "+" and "/", returns 0 on empty array';
avg.tags = ['average'];
avg.type = 'Identifier';

export default avg;
