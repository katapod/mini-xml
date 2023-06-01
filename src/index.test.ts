describe('index', () => {
  it('should export generateXMLFromObject', () => {
    const { generateXMLFromObject } = require('./index');
    expect(generateXMLFromObject).toBeDefined();
  });
});
