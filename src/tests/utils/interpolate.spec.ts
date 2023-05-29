import { interpolate } from "../../utils/interpolate";

describe('interpolate', () => {
  it('should return the original string if params is null or empty', () => {
    const str = 'test.com/user/';

    expect(interpolate(str, null)).toBe(str);
    expect(interpolate(str, {})).toBe(str);
  });

  it('should interpolate placeholders with corresponding values', () => {
    const str = 'test.com/user/{id}';
    const params = { id: 7 };

    const expected = 'test.com/user/7';
    expect(interpolate(str, params)).toBe(expected);
  });

  it('should interpolate placeholders with multiple corresponding values', () => {
    const str = 'test.com/user/{id}/practitioner/{practitionerId}';
    const params = { id: 7, practitionerId: 37 };

    const expected = 'test.com/user/7/practitioner/37';
    expect(interpolate(str, params)).toBe(expected);
  });


  it('should ignore null or undefined values in params', () => {
    const str = 'test.com/user/{id}/practitioner/{practitionerId}';
    const params = { id: null, practitionerId: 37 };

    const expected = 'test.com/user/{id}/practitioner/37';
    expect(interpolate(str, params)).toBe(expected);
  });

  test('should not interpolate missing parameters', () => {
    const str = 'test.com/user/{id}/practitioner/{practitionerId}';
    const params = { id: 7 };

    const expected = 'test.com/user/7/practitioner/{practitionerId}';
    expect(interpolate(str, params)).toBe(expected);
  });
});
