describe('index', () => {
  it('should export generateXMLFromObject', () => {
    const { generateXMLFromObject } = require('../src/index');
    expect(generateXMLFromObject).toBeDefined();
  });
  it('should export generateObjectFromXML', () => {
    const { generateObjectFromXML } = require('../src/index');
    expect(generateObjectFromXML).toBeDefined();
  });
});
