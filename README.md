# mini-xml

[![Build](https://github.com/Aerilym/mini-xml/actions/workflows/build.yml/badge.svg)](https://github.com/Aerilym/mini-xml/actions/workflows/build.yml)
[![npm version](https://badge.fury.io/js/mini-xml.svg)](https://badge.fury.io/js/mini-xml)
[![Known Vulnerabilities](https://snyk.io/test/github/aerilym/mini-xml/badge.svg)](https://snyk.io/test/github/aerilym/mini-xml)

A small, fast, and simple XML parser for Node.js and the browser. Generate XML from json.

## Usage

### Setup

```JavaScript
const miniXml = require('mini-xml');
```

or

```TypeScript
import { generateXMLFromObject } from 'mini-xml';
```

### Create XML from JSON

```TypeScript
import { generateXMLFromObject } from 'mini-xml';

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

```

TBA
