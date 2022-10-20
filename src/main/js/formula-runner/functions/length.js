import str from './str.js';
import { iterateFunction } from './util.js';

const length = (text) => {
  if (text == null) return 0;
  const textStr = str(text);
  return iterateFunction(
    [textStr],
    () => textStr.length
  );
};

length.id = 'length';
length.label = 'length(text)';
length.description = 'Returns the length (number of characters) in text.';

export default length;
