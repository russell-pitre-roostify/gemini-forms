import { iterateFunction } from './util';
import str from './str';

const replace = (textIn, searchText, replacementText) => {
  if (!textIn) {
    return;
  }

  const text = str(textIn);

  return iterateFunction(
    [text, searchText, replacementText],
    (specimen, searchSpecimen, replacementSpecimen) => {
      if (searchSpecimen instanceof RegExp) {
        return specimen.replace(searchSpecimen, replacementSpecimen);
      }
      return specimen.split(searchSpecimen).join(replacementSpecimen);
    }
  );
};

replace.id = 'replace';
replace.label = 'replace(text, searchText, replacementText)';
replace.description = 'Replaces text within a string, searchText can be a string or javascript regexp.';
replace.tags = [];
replace.type = 'Identifier';

export default replace;
