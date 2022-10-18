const lookup = (condition, list) => {

  const column = Array.isArray(list) ? list : [list];

  if (condition === undefined) {
    return column[0];
  }

  const result = column.filter((c, i) => {
    if (Array.isArray(condition)) {
      return condition[i];
    }
    return condition;

  });

  return result && result.length === 1 ? result[0] : result;
};

lookup.id = 'lookup';
lookup.label = 'lookup(recordSelectionLogicalTest, resultControlTag)';
lookup.description = 'Looks up a value from a column cell or control based on a logical test applied to select the row or record, in an Advanced Table or Repeater, respectively.';
lookup.tags = ['lookup'];
lookup.type = 'Identifier';

export default lookup;
