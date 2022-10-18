const last = arr => ((!arr || !Array.isArray(arr)) ? arr : arr[arr.length - 1]);

last.id = 'last';
last.label = 'last(array)';
last.description = 'Returns last element of an array';
last.tags = ['last'];
last.type = 'Identifier';

export default last;
