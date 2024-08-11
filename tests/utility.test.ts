import {
  replaceInvalidXmlElementBodyCharacters,
  replaceInvalidXmlAttributeCharacters,
  handleStringify,
} from '../src/utility';

describe('utility', () => {
  describe('replaceInvalidXmlElementBodyCharacters', () => {
    const xmlBodyInvalidRegex = /[<>&](?![a-zA-Z]+;)/g;
    it('should replace invalid characters', () => {
      const input = 'This is an invalid element body containing <invalid> characters & symbols';
      const expected =
        'This is an invalid element body containing &lt;invalid&gt; characters &amp; symbols';

      const output = replaceInvalidXmlElementBodyCharacters(input);

      expect(output).toEqual(expected);
      expect(output).not.toMatch(xmlBodyInvalidRegex);
    });
    it('should replace <, >, and &', () => {
      const input = 'foo<bar>baz&qux';
      const expected = 'foo&lt;bar&gt;baz&amp;qux';
      const actual = replaceInvalidXmlElementBodyCharacters(input);
      expect(actual).toEqual(expected);
      expect(actual).not.toMatch(xmlBodyInvalidRegex);
    });
    it('should not replace valid characters', () => {
      const input = 'foo bar';
      const expected = 'foo bar';
      const actual = replaceInvalidXmlElementBodyCharacters(input);
      expect(actual).toEqual(expected);
      expect(actual).not.toMatch(xmlBodyInvalidRegex);
    });
    it('should replace & but not &amp;', () => {
      const input = 'foo&bar&amp;baz';
      const expected = 'foo&amp;bar&amp;baz';
      const actual = replaceInvalidXmlElementBodyCharacters(input);
      expect(actual).toEqual(expected);
      expect(actual).not.toMatch(xmlBodyInvalidRegex);
    });
  });
  describe('replaceInvalidXmlAttributeCharacters', () => {
    const xmlAttributeInvalidRegex = /[<>"'](?![^&]*;)|&(?![a-zA-Z]+;)/g;
    it('should replace invalid characters', () => {
      const input = 'This is an invalid attribute containing <invalid> characters & symbols';
      const expected =
        'This is an invalid attribute containing &lt;invalid&gt; characters &amp; symbols';

      const output = replaceInvalidXmlAttributeCharacters(input);

      expect(output).toEqual(expected);
      expect(output).not.toMatch(xmlAttributeInvalidRegex);
    });
    it('should replace <, >, &, ", and \'', () => {
      const input = 'foo<bar>baz&qux"quux\'corge';
      const expected = 'foo&lt;bar&gt;baz&amp;qux&quot;quux&apos;corge';
      const actual = replaceInvalidXmlAttributeCharacters(input);
      expect(actual).toEqual(expected);
      expect(actual).not.toMatch(xmlAttributeInvalidRegex);
    });
    it('should not replace valid characters', () => {
      const input = 'foo bar';
      const expected = 'foo bar';
      const actual = replaceInvalidXmlAttributeCharacters(input);
      expect(actual).toEqual(expected);
      expect(actual).not.toMatch(xmlAttributeInvalidRegex);
    });
    it('should replace & but not &amp;', () => {
      const input = 'foo&bar&amp;baz';
      const expected = 'foo&amp;bar&amp;baz';
      const actual = replaceInvalidXmlAttributeCharacters(input);
      expect(actual).toEqual(expected);
      expect(actual).not.toMatch(xmlAttributeInvalidRegex);
    });
  });
  describe('handleStringify', () => {
    it('should stringify strings', () => {
      const input = 'foo';
      const expected = 'foo';
      const actual = handleStringify(input);
      expect(actual).toEqual(expected);
    });
    it('should stringify numbers', () => {
      const input = 42;
      const expected = '42';
      const actual = handleStringify(input);
      expect(actual).toEqual(expected);
    });
    it('should stringify booleans', () => {
      const input = true;
      const expected = 'true';
      const actual = handleStringify(input);
      expect(actual).toEqual(expected);
    });
    it('should stringify dates', () => {
      const input = new Date('2021-01-01T00:00:00.000Z');
      const expected = 'Fri, 01 Jan 2021 00:00:00 GMT';
      const actual = handleStringify(input);
      expect(actual).toEqual(expected);
    });
    it('should stringify dates with custom date function', () => {
      const input = new Date('2021-01-01T00:00:00.000Z');
      const expected = '2021-01-01';
      const actual = handleStringify(input, (date) => date.toISOString().split('T')[0]);
      expect(actual).toEqual(expected);
    });
    it('should stringify objects', () => {
      const input = { foo: 'bar' };
      const expected = '{"foo":"bar"}';
      const actual = handleStringify(input);
      expect(actual).toEqual(expected);
    });
    it('should stringify arrays', () => {
      const input = ['foo', 'bar'];
      const expected = '["foo","bar"]';
      const actual = handleStringify(input);
      expect(actual).toEqual(expected);
    });
    it('should stringify null', () => {
      const input = null;
      const expected = '';
      const actual = handleStringify(input);
      expect(actual).toEqual(expected);
    });
    it('should stringify undefined', () => {
      const input = undefined;
      const expected = '';
      const actual = handleStringify(input);
      expect(actual).toEqual(expected);
    });
  });
});
