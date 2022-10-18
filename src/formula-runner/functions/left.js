/* eslint-disable consistent-return */
import _take from 'lodash/take';
import str from './str';
import { iterateFunction } from './util';

const left = (text, numberOfCharacters) => {
  if (!text) return;
  const textStr = str(text);
  return iterateFunction(
    [textStr, numberOfCharacters],
    () => {
      if (!numberOfCharacters) {
        return textStr;
      }
      return _take(textStr, numberOfCharacters).join('');
    }
  );
};

left.id = 'left';
left.label = 'left(text, numberOfCharacters)';
left.description = 'Returns the left part of a text with the specified number of characters.';

export default left;
