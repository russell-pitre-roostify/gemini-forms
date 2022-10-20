const first = arr => ((!arr || !Array.isArray(arr)) ? arr : arr[0]);

first.id = 'first';
first.label = 'first(array)';
first.description = 'Returns first element of an array';
first.tags = ['first'];
first.type = 'Identifier';

export default first;
