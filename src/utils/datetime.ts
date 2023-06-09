import dayjs from 'dayjs';

/**
 * Format a date into the given format.
 *
 * @param {Date} date
 * @param {string} formatting
 * @returns {string}
 */
export const formatDate = (date: Date | string, formatting: string): string => {
  if (date) {
    return dayjs(date).format(formatting);
  }

  return '';
};
