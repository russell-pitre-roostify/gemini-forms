/* eslint-disable no-case-declarations */
import moment from 'moment';
import date from './date';
import { iterateFunction } from './util';

function differenceInYears(dirtyDateLeft, dirtyDateRight) {
  const dateLeft = moment(dirtyDateLeft);
  const dateRight = moment(dirtyDateRight);
  return dateLeft.diff(dateRight, 'years');
}

function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  const dateLeft = moment(dirtyDateLeft);
  const dateRight = moment(dirtyDateRight);

  return dateLeft.diff(dateRight, 'months');
}

function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  const dateLeft = moment(dirtyDateLeft);
  const dateRight = moment(dirtyDateRight);

  return dateLeft.diff(dateRight, 'days');
}

function differenceInHours(dirtyDateLeft, dirtyDateRight) {
  const dateLeft = moment(dirtyDateLeft);
  const dateRight = moment(dirtyDateRight);

  return dateLeft.diff(dateRight, 'hours');
}

function differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
  const dateLeft = moment(dirtyDateLeft);
  const dateRight = moment(dirtyDateRight);

  return dateLeft.diff(dateRight, 'minutes');
}

function startOfDay(dirtyDate) {
  const dateDay = dirtyDate;
  dateDay.setHours(0, 0, 0, 0);
  return dateDay;
}

function startOfMinute(dirtyDate) {
  const dateMin = dirtyDate;
  dateMin.setSeconds(0, 0);
  return dateMin;
}

const dateDiff = (startDate, endDate, datePart) => {
  if (!datePart) {
    throw new Error(
      'dateDiff requires a "datePart" member ("years","months","days","hours",or "minutes").'
    );
  }

  return iterateFunction(
    [startDate, endDate, datePart],
    () => {
      if (!datePart) {
        throw new Error(
          'dateDiff requires a "datePart" member ("years","months","days","hours",or "minutes").'
        );
      }

      if (!startDate || !endDate) return undefined;

      // convert legacy datePart
      let datePartTrimmed = datePart.toLowerCase().trim();
      if (['years', 'months', 'days', 'hours', 'minutes'].indexOf(datePart) === -1) {
        if (datePartTrimmed.indexOf('y') === 0) datePartTrimmed = 'years';
        else if (datePartTrimmed.indexOf('d') === 0) datePartTrimmed = 'days';
        else if (datePartTrimmed.indexOf('hour') === 0) datePartTrimmed = 'hours';
        else if (datePartTrimmed.indexOf('minute') === 0) datePartTrimmed = 'minutes';
        else if (datePartTrimmed.indexOf('m')) datePartTrimmed = 'months';
      }

      const timeComparison = ['hours', 'minutes'].indexOf(datePartTrimmed) > -1;

      startDate = date(startDate, timeComparison);
      if (!startDate) return undefined;

      endDate = date(endDate, timeComparison);
      if (!endDate) return undefined;

      if (['years', 'months', 'days'].indexOf(datePartTrimmed.toLowerCase()) > -1) {
        startDate = startOfDay(startDate);
        endDate = startOfDay(endDate);
      } else if (['hours', 'minutes'].indexOf(datePartTrimmed.toLowerCase()) > -1) {
        startDate = startOfMinute(startDate);
        endDate = startOfMinute(endDate);
      }

      switch (datePartTrimmed.toLowerCase()) {
        case 'years':
          return differenceInYears(endDate, startDate);
        case 'months':
          return differenceInMonths(endDate, startDate);
        case 'days':
          return differenceInDays(endDate, startDate);
        case 'hours':
          return differenceInHours(endDate, startDate);
        case 'minutes':
          return differenceInMinutes(endDate, startDate);
        default:
          // legacy datePartTrimmed that we were not able to identify earlier in the process.
          const result = new moment(endDate).diff(startDate, datePartTrimmed);
          return isNaN(result) ? undefined : result;
      }
    }
  );
};

dateDiff.id = 'dateDiff';
dateDiff.label = 'dateDiff(startDate, endDate, datePart)';
dateDiff.description = "Calculates the difference between two date values (startDate and endDate) in 'years', 'months', 'days', 'hours', and 'minutes' (datePart).";
dateDiff.tags = ['convert', 'date'];
dateDiff.type = 'Identifier';

export default dateDiff;
