const count = (arr) => {
  if (!arr) {
    return 0;
  }
  return Array.isArray(arr) ? arr.length : [arr].length;
};

count.id = 'count';
count.label = 'count(array)';
count.description = 'Counts all members of an array';
count.tags = ['count'];
count.type = 'Identifier';

export default count;
