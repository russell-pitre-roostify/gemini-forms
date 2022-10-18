/* eslint-disable new-cap */
/* eslint-disable no-case-declarations */
import moment from 'moment';
import date from './date';
import num from './num';
import { iterateFunction } from './util';

const dateAdd = (startDate, interval, datePart) => {
  if (!datePart) {
    throw new Error(
      'dateDiff requires a "datePart" member ("years","months","days","hours",or "minutes").'
    );
  }
  return iterateFunction(
    [startDate, interval, datePart],
    () => {
      if (!startDate || Number.isNaN(interval)) return undefined;

      const startDateFormatted = date(startDate);
      const intervalNum = num(interval);
      if (startDateFormatted && !Number.isNaN(intervalNum) && intervalNum != null) {
        const result = new moment(startDateFormatted).add(interval, datePart);
        return Number.isNaN(result) ? undefined : result.toDate();
      }
      return undefined;
    }
  );
};

dateAdd.id = 'dateAdd';
dateAdd.label = 'dateAdd(startDate, interval, datePart)';
dateAdd.description = 'Calculates the date after which a certain time/date interval has been added';
dateAdd.tags = ['convert', 'date'];
dateAdd.type = 'Identifier';

export default dateAdd;
