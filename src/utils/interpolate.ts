/**
 *
 * @param {string} str
 * @param {object} params
 * @returns {string}
 */
export function interpolate(str: string, params: object | null): string {
  let formattedString = str;

  if (!params || !Object.keys(params)) {
    return str;
  }

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }

    formattedString = formattedString.replace(new RegExp('{' + key + '}', 'gi'), value.toString());
  }

  return formattedString;
}
