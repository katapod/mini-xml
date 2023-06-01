import { generateXMLFromObject, getElements } from './builder';
import libxmljs from 'libxmljs';

describe('Builder functionality', () => {
  it('Creates empty XML from empty JSON', () => {
    const json = {};

    const xml = `<?xml version="1.0" encoding="UTF-8"?>`;

    const generatedXML = generateXMLFromObject(json);

    expect(generatedXML).toEqual(xml);
  });
  it('Creates self closing root XML from 0 depth JSON', () => {
    const json = {
      root: {},
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root/>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with given version', () => {
    const json = {
      '@version': '2.0',
    };

    const xml = `<?xml version="2.0" encoding="UTF-8"?>`;

    const generatedXML = generateXMLFromObject(json);

    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with given encoding', () => {
    const json = {
      '@encoding': 'UTF-16',
    };

    const xml = `<?xml version="1.0" encoding="UTF-16"?>`;

    const generatedXML = generateXMLFromObject(json);

    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with no version when given the option', () => {
    const json = {};

    const xml = `<?xml encoding="UTF-8"?>`;

    const generatedXML = generateXMLFromObject(json, { excludeXMLVersion: true });

    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with no encoding when given the option', () => {
    const json = {};

    const xml = `<?xml version="1.0"?>`;

    const generatedXML = generateXMLFromObject(json, { excludeXMLEncoding: true });

    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with no encoding or version when given the options', () => {
    const json = {};

    const xml = `<?xml?>`;

    const generatedXML = generateXMLFromObject(json, {
      excludeXMLEncoding: true,
      excludeXMLVersion: true,
    });

    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with nothing when given the header exclusion option', () => {
    const json = {};

    const xml = ``;

    const generatedXML = generateXMLFromObject(json, {
      excludeXMLHeader: true,
    });

    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with additional header tag when given', () => {
    const json = {
      '?xml-stylesheet': {
        '@href': 'https://google.com',
        '@type': 'text/xsl',
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="https://google.com" type="text/xsl"?>`;

    const generatedXML = generateXMLFromObject(json);

    expect(generatedXML).toEqual(xml);
  });
  it('Creates self closing root XML from 0 depth JSON', () => {
    const json = {
      root: {},
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root/>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('Creates self closing root XML from 0 depth JSON with attributes', () => {
    const json = {
      root: {
        '@att': 'val',
      },
    };
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val"/>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('Creates self closing root XML from 0 depth JSON with attributes single child', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: 'bar',
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>bar</foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);

    const notPrettyXml = `<?xml version="1.0" encoding="UTF-8"?><root att="val"><foo>bar</foo></root>`;

    const generatedXMLNotPretty = generateXMLFromObject(json, { pretty: false });
    expect(generatedXMLNotPretty).toEqual(notPrettyXml);
  });
  it('Creates self closing root XML from 0 depth JSON with single text child', () => {
    const json = {
      root: 'foo',
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root>foo</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);

    const notPrettyXml = `<?xml version="1.0" encoding="UTF-8"?><root>foo</root>`;

    const generatedXMLNotPretty = generateXMLFromObject(json, { pretty: false });
    expect(generatedXMLNotPretty).toEqual(notPrettyXml);
  });
  it('Creates self closing XML from 1 depth JSON with attributes', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          '@att': 'val',
        },
      },
    };
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo att="val"/>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);

    const notPrettyXml = `<?xml version="1.0" encoding="UTF-8"?><root att="val"><foo att="val"/></root>`;

    const generatedXMLNotPretty = generateXMLFromObject(json, { pretty: false });
    expect(generatedXMLNotPretty).toEqual(notPrettyXml);
  });
  it('Creates self closing XML from 1 depth JSON with attributes single child', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);

    const notPrettyXml = `<?xml version="1.0" encoding="UTF-8"?><root att="val"><foo><bar>foobar</bar></foo></root>`;

    const generatedXMLNotPretty = generateXMLFromObject(json, { pretty: false });
    expect(generatedXMLNotPretty).toEqual(notPrettyXml);
  });
  it('Creates self closing XML from 1 depth JSON with attributes nested child', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: {
            baz: 'foobarbaz',
          },
        },
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>
      <baz>foobarbaz</baz>
    </bar>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);

    const notPrettyXml = `<?xml version="1.0" encoding="UTF-8"?><root att="val"><foo><bar><baz>foobarbaz</baz></bar></foo></root>`;

    const generatedXMLNotPretty = generateXMLFromObject(json, { pretty: false });
    expect(generatedXMLNotPretty).toEqual(notPrettyXml);
  });
  it('Creates XML with arrays with text', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: ['bar', 'baz'],
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>bar</foo>
  <foo>baz</foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with arrays with multiple children with single tags', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: [
          {
            bar: 'foobar',
          },
          {
            bar: 'barfoo',
          },
        ],
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <foo>
    <bar>barfoo</bar>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with arrays with multiple children with multiple tags', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: [
          {
            bar: 'foobar',
            baz: 'foobaz',
          },
          {
            bar: 'barfoo',
            baz: 'bazfoo',
          },
        ],
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
    <baz>foobaz</baz>
  </foo>
  <foo>
    <bar>barfoo</bar>
    <baz>bazfoo</baz>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('Creates XML with arrays with multiple children with different number of tags', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: [
          {
            bar: 'foobar',
          },
          {
            bar: 'barfoo',
            baz: 'bazfoo',
          },
        ],
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <foo>
    <bar>barfoo</bar>
    <baz>bazfoo</baz>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('should correctly format tags with newline characters in the text', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: `This
          is
          some text
          with newlines`,
        },
        baz: {},
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>
This
          is
          some text
          with newlines
    </bar>
  </foo>
  <baz/>
</root>`;

    const generatedXML = generateXMLFromObject(json);

    expect(generatedXML).toEqual(xml);
  });
  it('should correctly construct XML from JSON', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: {},
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz/>
</root>`;

    const generatedXML = generateXMLFromObject(json);

    expect(generatedXML).toEqual(xml);
  });
  it('create text nodes from the #text key', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: {
          '#text': 'baz',
        },
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz>baz</baz>
</root>`;

    const generatedXML = generateXMLFromObject(json);

    expect(generatedXML).toEqual(xml);
  });
  it('create CData nodes from the #cdata key', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: {
          '#cdata': '<greeting>Hello, world!</greeting>',
        },
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz>
    <![CDATA[<greeting>Hello, world!</greeting>]]>
  </baz>
</root>`;

    const generatedXML = generateXMLFromObject(json);

    expect(generatedXML).toEqual(xml);
  });
  it('Generate with user defined indentSpaces', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: {},
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
*<foo>
**<bar>foobar</bar>
*</foo>
*<baz/>
</root>`;

    const generatedXML0 = generateXMLFromObject(json, { indentSpaces: 0 });
    expect(generatedXML0).toEqual(xml.replace(/\*/g, ''));

    const generatedXML1 = generateXMLFromObject(json, { indentSpaces: 1 });
    expect(generatedXML1).toEqual(xml.replace(/\*/g, ' '));

    const generatedXML2 = generateXMLFromObject(json, { indentSpaces: 2 });
    expect(generatedXML2).toEqual(xml.replace(/\*/g, '  '));

    const generatedXML3 = generateXMLFromObject(json, { indentSpaces: 3 });
    expect(generatedXML3).toEqual(xml.replace(/\*/g, '   '));

    const generatedXML4 = generateXMLFromObject(json, { indentSpaces: 4 });
    expect(generatedXML4).toEqual(xml.replace(/\*/g, '    '));
  });
  it('supports data type: undefined', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: undefined,
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz/>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('supports data type: string', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: 'string',
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz>string</baz>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('supports data type: number', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: 69420,
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz>69420</baz>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('supports data type: boolean', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: true,
        },
        baz: 'string',
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>true</bar>
  </foo>
  <baz>string</baz>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('supports data type: Date', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: new Date('2020-04-20T04:20:00.000Z'),
      },
    };
    //UTC
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz>Mon, 20 Apr 2020 04:20:00 GMT</baz>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('custom date object to string function', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: new Date('2020-04-20T04:20:00.000Z'),
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="val">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz>2020</baz>
</root>`;

    const generatedXML = generateXMLFromObject(json, {
      formatDateFunction: (date: Date) => date.getFullYear().toString(),
    });
    expect(generatedXML).toEqual(xml);
  });
  it('throws an error if an incorrect type is passed as a value', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: () => {},
        },
        baz: {},
      },
    };

    // @ts-ignore
    expect(() => generateXMLFromObject(json)).toThrowError('Invalid value type: function');
  });
  it('stringifies attributes of type json', () => {
    const json = {
      root: {
        '@att': {
          foo: 'bar',
        },
        foo: {
          bar: 'foobar',
        },
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="{&quot;foo&quot;:&quot;bar&quot;}">
  <foo>
    <bar>foobar</bar>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('supports attribute data type: undefined', () => {
    const json = {
      root: {
        '@att': undefined,
        foo: {
          bar: 'foobar',
        },
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="">
  <foo>
    <bar>foobar</bar>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('supports attribute data type: string', () => {
    const json = {
      root: {
        '@att': 'string',
        foo: {
          bar: 'foobar',
        },
        baz: 'string',
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="string">
  <foo>
    <bar>foobar</bar>
  </foo>
  <baz>string</baz>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('supports attribute data type: number', () => {
    const json = {
      root: {
        '@att': 69420,
        foo: {
          bar: 'foobar',
        },
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="69420">
  <foo>
    <bar>foobar</bar>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('supports attribute data type: boolean', () => {
    const jsonTrue = {
      root: {
        '@att': true,
        baz: 'string',
      },
    };

    const jsonFalse = {
      root: {
        '@att': false,
        baz: 'string',
      },
    };

    const xmlTrue = `<?xml version="1.0" encoding="UTF-8"?>
<root att="true">
  <baz>string</baz>
</root>`;

    const xmlFalse = `<?xml version="1.0" encoding="UTF-8"?>
<root att="false">
  <baz>string</baz>
</root>`;

    const generatedXMLTrue = generateXMLFromObject(jsonTrue);
    expect(generatedXMLTrue).toEqual(xmlTrue);
    const generatedXMLFalse = generateXMLFromObject(jsonFalse);
    expect(generatedXMLFalse).toEqual(xmlFalse);
  });
  it('supports attribute data type: Date', () => {
    const json = {
      root: {
        '@att': new Date('2020-04-20T04:20:00.000Z'),
        foo: {
          bar: 'foobar',
        },
      },
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root att="Mon, 20 Apr 2020 04:20:00 GMT">
  <foo>
    <bar>foobar</bar>
  </foo>
</root>`;

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
  });
  it('getElements should return the object if given no prefix', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: 'string',
      },
    };

    const elements = getElements(json);
    expect(elements).toEqual(json);
  });
});

describe('XML validates against libxmljs', () => {
  const isValidSyntaxStructure = function (text: string) {
    try {
      libxmljs.parseXml(text);
    } catch (e) {
      return false;
    }

    return true;
  };
  it('should validate XML against XSD', () => {
    const json = {
      root: {
        '@att': 'val',
        foo: {
          bar: 'foobar',
        },
        baz: {},
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(isValidSyntaxStructure(generatedXML)).toEqual(true);
  });
});
