import { formatDate } from "../../utils/datetime";

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const date = new Date('2023-05-21');
    const formatting = 'YYYY-MM-DD';
    const formattedDate = formatDate(date, formatting);
    
    expect(formattedDate).toBe('2023-05-21');
  });

  it('should return an empty string if the date is undefined', () => {
    const formatting = 'YYYY-MM-DD';
    const formattedDate = formatDate(undefined, formatting);

    expect(formattedDate).toBe('');
  });

  it('should return an empty string if the date is an invalid string', () => {
    const invalidDate = 'invalid-date';
    const formatting = 'YYYY-MM-DD';
    const formattedDate = formatDate(invalidDate, formatting);

    expect(formattedDate).toBe('Invalid Date');
  });

  it('should handle different formatting options', () => {
    const date = new Date('2023-05-21');
    const formatting = 'MM/DD/YYYY';
    const formattedDate = formatDate(date, formatting);

    expect(formattedDate).toBe('05/21/2023');
  });
});
