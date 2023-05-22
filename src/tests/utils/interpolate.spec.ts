import { interpolate } from "../../utils/interpolate";

describe('interpolate', () => {
  it('should return the original string if params is null or empty', () => {
    const str = 'Hello, {name}!';

    expect(interpolate(str, null)).toBe(str);
    expect(interpolate(str, {})).toBe(str);
  });

  it('should interpolate placeholders with corresponding values', () => {
    const str = 'Hello, {name}! You are {age} years old.';
    const params = { name: 'Ramesh', age: 30 };

    const expected = 'Hello, Ramesh! You are 30 years old.';
    expect(interpolate(str, params)).toBe(expected);
  });

  it('should ignore null or undefined values in params', () => {
    const str = 'Hello, {name}! You are {age} years old.';
    const params = { name: 'Ramesh', age: null };

    const expected = 'Hello, Ramesh! You are {age} years old.';
    expect(interpolate(str, params)).toBe(expected);
  });

  it('should handle multiple occurrences of the same placeholder', () => {
    const str = 'The value is {value}. {value} is important.';
    const params = { value: '42' };

    const expected = 'The value is 42. 42 is important.';
    expect(interpolate(str, params)).toBe(expected);
  });
});
