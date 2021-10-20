import {
  isValid,
  subMinutes,
  subHours,
  compareAsc,
  differenceInMinutes,
  differenceInHours,
  isYesterday,
  isThisYear,
  format,
} from "date-fns";

/**
 * Compares supplied date with now and returns string of either now | ##m ago | ##h ago | yesterday | d MMM | d MMM yy | ""
 * Empty string is returned on invalid date supplied.
 * @param {Date} dateToParse
 * @returns {string}
 */
export const parseDate = (dateToParse) => {
  try {
    if (!dateToParse) return "";

    const dateFrom = new Date(dateToParse);
    const dateNow = new Date();

    if (!isValid(dateFrom)) return "";

    const nowMinus1m = subMinutes(dateNow, 1);
    const isWithin1m = compareAsc(dateFrom, nowMinus1m) !== -1;
    if (isWithin1m) return `now`;

    const nowMinus1hr = subHours(dateNow, 1);
    const isWithin1Hr = compareAsc(dateFrom, nowMinus1hr) === 1;
    if (isWithin1Hr) return `${differenceInMinutes(dateNow, dateFrom)}m ago`;

    const nowMinus24hr = subHours(dateNow, 24);
    const isWithin24Hr = compareAsc(dateFrom, nowMinus24hr) === 1;
    if (isWithin24Hr) return `${differenceInHours(dateNow, dateFrom)}h ago`;

    const isNot24HrOrLess = compareAsc(dateFrom, nowMinus24hr) !== 1;
    if (isNot24HrOrLess && isYesterday(dateFrom)) return `yesterday`;

    if (isThisYear(dateFrom)) return format(dateFrom, "d MMM");

    return format(dateFrom, "d MMM yy");
  } catch (e) {
    return "";
  }
};
