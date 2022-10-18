import { iterateFunction } from './util';

const iff = (condition, ifTrue, ifFalse) => iterateFunction(
  [condition, ifTrue, ifFalse],
  (c, t, f) => (c ? t : f)
);

iff.id = 'iff';
iff.label = 'iff(condition, ifTrue, ifFalse)';
iff.description = 'Returns \'ifTrue\' \'ifFalse\' or  truthiness of \'condition\'';
iff.tags = [];
iff.type = 'Identifier';

export default iff;
