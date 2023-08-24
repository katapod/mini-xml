describe('index', () => {
  it('should export generateXMLFromObject', () => {
    const { generateXMLFromObject } = require('./index');
    expect(generateXMLFromObject).toBeDefined();
  });
  it('should export generateObjectFromXML', () => {
    const { generateObjectFromXML } = require('./index');
    expect(generateObjectFromXML).toBeDefined();
  });
});
