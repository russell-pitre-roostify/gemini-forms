import toLowerCase from './toLowerCase.js';
import { iterateFunction } from './util.js';

const containsText = (textToSearch, textToFind) => {
  if (textToFind == null || textToSearch == null) return false;
  return iterateFunction(
    [textToSearch, textToFind],
    () => {
      const textToFindLower = toLowerCase(textToFind);
      const textToSearchLower = toLowerCase(textToSearch);

      return textToSearchLower.indexOf(textToFindLower) > -1;
    }
  );
};

containsText.id = 'containsText';
containsText.label = 'containsText(textToSearch, textToFind)';
containsText.description = 'Returns True if textToSearch contains textToFind';

export default containsText;
