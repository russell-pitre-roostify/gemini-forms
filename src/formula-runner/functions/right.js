/* eslint-disable consistent-return */
import _takeRight from 'lodash/takeRight';
import str from './str';
import { iterateFunction } from './util';

const right = (text, numberOfCharacters) => {
  if (!text) return;
  const textStr = str(text);
  return iterateFunction(
    [textStr, numberOfCharacters],
    () => {
      if (!numberOfCharacters) {
        return textStr;
      }
      return _takeRight(textStr, numberOfCharacters).join('');
    }
  );
};

right.id = 'right';
right.label = 'right(text, numberOfCharacters)';
right.description = 'Returns the right part of a text with the specified number of characters.';

export default right;
