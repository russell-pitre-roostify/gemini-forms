import moment from 'moment';
import { iterateFunction } from './util.js';

const date = (value, includeTime) => iterateFunction([value, includeTime], () => {
  const result = value && typeof value === 'number'
    ? new moment(value)
    : new moment(value, [
      'MM-DD-YYYY',
      'YYYY-MM-DD',
      'YYYY MMM DD',
      'DD MMM YYYY',
      'L',
      'LL',
      'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ',
    ]);

  const dateValue = new Date(value);
  // this check is necessary to make sure that date is valid and date is not a weird date (6/31, 2/30, etc.).
  // formats "YYYY MMM DD", "DD MMM YYYY", "L", and "LL" allow for moment to create a weird (but valid) date
  if (
    result.isValid()
            && !Number.isNaN(dateValue.getTime())
            && dateValue.getMonth() === result.month()
  ) {
    return includeTime ? result.toDate() : result.startOf('day').toDate();
  }

  switch (value) {
    case 'null':
      return null;
    default:
      return undefined;
  }
});

export default date;
