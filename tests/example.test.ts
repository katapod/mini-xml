import { generateXMLFromObject } from '../src';
import { isValidXml } from '../src/tests';

describe('Builder can create examples', () => {
  it('W3Schools RSS Feed', () => {
    const exampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>W3Schools Home Page</title>
    <link>https://www.w3schools.com</link>
    <description>Free web building tutorials</description>
    <item>
      <title>RSS Tutorial</title>
      <link>https://www.w3schools.com/xml/xml_rss.asp</link>
      <description>New RSS tutorial on W3Schools</description>
    </item>
    <item>
      <title>XML Tutorial</title>
      <link>https://www.w3schools.com/xml</link>
      <description>New XML tutorial on W3Schools</description>
    </item>
  </channel>
</rss>`;

    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'W3Schools Home Page',
          link: 'https://www.w3schools.com',
          description: 'Free web building tutorials',
          item: [
            {
              title: 'RSS Tutorial',
              link: 'https://www.w3schools.com/xml/xml_rss.asp',
              description: 'New RSS tutorial on W3Schools',
            },
            {
              title: 'XML Tutorial',
              link: 'https://www.w3schools.com/xml',
              description: 'New XML tutorial on W3Schools',
            },
          ],
        },
      },
    };

    const generatedXML = generateXMLFromObject(json);
    expect(generatedXML).toEqual(exampleXML);
    expect(isValidXml(generatedXML)).toEqual(true);
  });
  it('xul.fr RSS Feed', () => {
    const exampleXML = `<?xml version="1.0"?>
<rss version="2.0">
    <channel>
        <title>Ajax and XUL</title>
        <link>https://www.xul.fr/en/</link>
        <description>XML graphical interface etc...</description>
        <image>
            <url>https://www.xul.fr/xul-icon.gif</url>
            <link>https://www.xul.fr/en/index.php</link>
        </image>
        <item>
            <title>News  of today</title>
            <link>https://www.xul.fr/en-xml-rss.html</link>
            <description>All you need to know about RSS</description>
        </item>
        <item>
            <title>News of tomorrows</title>
            <link>https://www.xul.fr/en-xml-rdf.html</link>
            <description>And now, all about RDF</description>
        </item>
    </channel>
</rss>`;

    const json = {
      rss: {
        '@version': '2.0',
        channel: {
          title: 'Ajax and XUL',
          link: 'https://www.xul.fr/en/',
          description: 'XML graphical interface etc...',
          image: {
            url: 'https://www.xul.fr/xul-icon.gif',
            link: 'https://www.xul.fr/en/index.php',
          },
          item: [
            {
              title: 'News  of today',
              link: 'https://www.xul.fr/en-xml-rss.html',
              description: 'All you need to know about RSS',
            },
            {
              title: 'News of tomorrows',
              link: 'https://www.xul.fr/en-xml-rdf.html',
              description: 'And now, all about RDF',
            },
          ],
        },
      },
    };

    const generatedXML = generateXMLFromObject(json, { indentSpaces: 4, excludeXMLEncoding: true });
    expect(generatedXML).toEqual(exampleXML);
    expect(isValidXml(generatedXML)).toEqual(true);
  });
});
