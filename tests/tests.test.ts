import { isValidXml } from '../src/tests';
import { cleanXML, dirtyXML } from '../src/constants';

describe('test functions', () => {
  describe('isValidXml', () => {
    it('should return true for valid xml', () => {
      expect(isValidXml(cleanXML)).toEqual(true)
    });
    it('return false for invalid xml', () => {
      expect(isValidXml(dirtyXML)).toEqual(false)
    });
  });
});
