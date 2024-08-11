import { generateXMLFromObject } from '../src';
import { isValidXml } from '../src/tests';

describe('Builder can create all RSS tags and attributes', () => {
  it('creates a basic RSS Feed (rss, channel, title, lint, description)', async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: category',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <category>Media</category>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          category: 'Media',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: category - domain',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <category domain="dmoz">Newspapers/Regional/United_States/Texas</category>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          category: {
            '@domain': 'dmoz',
            '#text': 'Newspapers/Regional/United_States/Texas',
          },
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: cloud',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <cloud domain="server.example.com" path="/rpc" port="80" protocol="xml-rpc" registerProcedure="cloud.notify"/>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          cloud: {
            '@domain': 'server.example.com',
            '@path': '/rpc',
            '@port': '80',
            '@protocol': 'xml-rpc',
            '@registerProcedure': 'cloud.notify',
          },
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: copyright', async  () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <copyright>2006 Refsnes Data as. All rights reserved.</copyright>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          copyright: '2006 Refsnes Data as. All rights reserved.',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: docs',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <docs>https://www.rssboard.org/rss-specification</docs>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          docs: 'https://www.rssboard.org/rss-specification',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: generator - text and version',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <generator>XML Builder v1.0.0</generator>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          generator: 'XML Builder v1.0.0',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: generator - link',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <generator>https://github.com/aerilym</generator>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          generator: 'https://github.com/aerilym',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: image (link, title, url, description, height, width)',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://github.com/aerilym</link>
    <description>Free web building tutorials</description>
    <image>
      <link>http://dallas.example.com</link>
      <title>Dallas Times-Herald</title>
      <url>http://dallas.example.com/masthead.gif</url>
      <description>Read the Dallas Times-Herald</description>
      <height>32</height>
      <width>96</width>
    </image>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://github.com/aerilym',
          description: 'Free web building tutorials',
          image: {
            link: 'http://dallas.example.com',
            title: 'Dallas Times-Herald',
            url: 'http://dallas.example.com/masthead.gif',
            description: 'Read the Dallas Times-Herald',
            height: 32,
            width: 96,
          },
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: language',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <language>en-us</language>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          language: 'en-us',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: lastBuildDate', async  () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <lastBuildDate>Mon, 29 Jan 2007 17:17:44 GMT</lastBuildDate>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          lastBuildDate: 'Mon, 29 Jan 2007 17:17:44 GMT',
        },
      },
    };

    const jsonWithDateObject = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          lastBuildDate: new Date('2007-01-29T17:17:44.000Z'),
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
    const generatedXMLWithDateObject = generateXMLFromObject(jsonWithDateObject);
    expect(generatedXMLWithDateObject).toEqual(xml);
    expect(await isValidXml(generatedXMLWithDateObject)).toEqual(true);
  });
  it('supports tag: managingEditor',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <managingEditor>Jim Lehrer &lt;jlehrer@dallas.example.com&gt;</managingEditor>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          managingEditor: 'Jim Lehrer <jlehrer@dallas.example.com>',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: lastBuildDate',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <pubDate>Thu, 27 Apr 2006 00:00:00 GMT</pubDate>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          pubDate: 'Thu, 27 Apr 2006 00:00:00 GMT',
        },
      },
    };

    const jsonWithDateObject = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          pubDate: new Date('2006-04-27T00:00:00.000Z'),
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
    const generatedXMLWithDateObject = generateXMLFromObject(jsonWithDateObject);
    expect(generatedXMLWithDateObject).toEqual(xml);
    expect(await isValidXml(generatedXMLWithDateObject)).toEqual(true);
  });
  it('supports tag: rating',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <rating>(PICS-1.1 "http://www.rsac.org/ratingsv01.html" l by "webmaster@example.com" on "2007.01.29T10:09-0800" r (n 0 s 0 v 0 l 0))</rating>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          rating:
            '(PICS-1.1 "http://www.rsac.org/ratingsv01.html" l by "webmaster@example.com" on "2007.01.29T10:09-0800" r (n 0 s 0 v 0 l 0))',
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
  it('supports tag: skipDays',  async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <skipDays>
      <day>Saturday</day>
      <day>Sunday</day>
    </skipDays>
  </channel>
</rss>`;
    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          skipDays: {
            day: ['Saturday', 'Sunday'],
          },
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(xml);
    expect(await isValidXml(generatedXML)).toEqual(true);
  });
});
