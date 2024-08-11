import { generateObjectFromXML } from '../src/parser';
import { cleanXML, targetJson } from '../src/constants';

describe('Parser Functionality', () => {
  it('Creates JSON from real XML', async () => {
    const json = generateObjectFromXML(cleanXML);

    expect(json).toBeDefined();

    const generatedJson = {
      '?xml-stylesheet': {
        '@href': 'https://feeds.katapod.com/stylesheet.xsl',
        '@type': 'text/xsl',
      },
      rss: {
        '@version': '2.0',
        '@xmlns:dc': 'http://purl.org/dc/elements/1.1/',
        '@xmlns:atom': 'http://www.w3.org/2005/Atom',
        '@xmlns:sy': 'http://purl.org/rss/1.0/modules/syndication/',
        '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        '@xmlns:itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd',
        '@xmlns:podcast': 'https://podcastindex.org/namespace/1.0',
        channel: json,
      },
    };

    expect(generatedJson).toStrictEqual(targetJson);
  });
});
