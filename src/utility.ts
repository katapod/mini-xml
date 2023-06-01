/**
 * Replaces control characters with their escaped versions.
 * @param str - the string to replace the control characters in
 * @returns the string with the control characters replaced
 *
 */
export function replaceInvalidXmlElementBodyCharacters(input: string): string {
  const invalidCharacters = /[<>&](?![a-zA-Z]+;)/g;
  const replacementMap: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
  };

  return input.replace(invalidCharacters, (match) => replacementMap[match]);
}

/**
 * Replaces invalid attribute characters with their escaped versions.
 * @param str - the string to replace the invalid attribute characters in
 * @returns the string with the invalid attribute characters replaced
 *
 * @see {@link https://www.w3.org/TR/xml/#NT-AttValue}
 *
 */
export function replaceInvalidXmlAttributeCharacters(input: string): string {
  const invalidCharacters = /[<>"'](?![^&]*;)|&(?![a-zA-Z]+;)/g;

  const replacementMap: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
  };

  return input.replace(invalidCharacters, (match) => replacementMap[match]);
}

/**
 * Replaces invalid CDATA characters with their escaped versions.
 * @param input - the string to replace the invalid CDATA characters in
 * @returns the string with the invalid CDATA characters replaced
 */
export function replaceInvalidXmlCdataCharacters(input: string): string {
  const invalidCharacters = /]]>/g;
  const replacementMap: Record<string, string> = {
    ']]>': ']]&gt;',
  };

  return input.replace(invalidCharacters, (match) => replacementMap[match]);
}

/**
 * Handle data type conversion to desired string format
 * @param value - the value to convert
 * @returns the converted value
 */
export function handleStringify(
  value?: XMLValueType | null,
  formatDateFunction?: (date: Date) => string
): string {
  if (value == undefined || value === null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'boolean') return `${value}`;
  if (value instanceof Date) {
    if (!formatDateFunction) return value.toUTCString();
    return formatDateFunction(value);
  }
  return JSON.stringify(value);
}
