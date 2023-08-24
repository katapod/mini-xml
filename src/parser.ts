import DomParser, { Node } from 'dom-parser';
import type { XMLObject } from './types';

interface CleanNode extends Node {
  jsonName: string;
}

/**
 * Add additional properties to the node to make it easier to work with.
 * @param node - The node to clean.
 * @returns The cleaned node.
 */
function cleanNode(node: Node): CleanNode {
  const cleanNode = node as CleanNode;
  const sterilizedNode = JSON.stringify(cleanNode);
  const namespace: string | null = JSON.parse(sterilizedNode).namespace;
  if (namespace) {
    cleanNode.jsonName = `${cleanNode.nodeName}:${namespace}`;
  } else {
    cleanNode.jsonName = cleanNode.nodeName;
  }

  return cleanNode;
}

/**
 * Generates a JSON object from an XML string.
 * @param xmlString - The XML string to parse.
 * @returns A JSON object representing the XML.
 */
export function generateObjectFromXML(xmlString: string): XMLObject {
  const parser = new DomParser();
  const xmlDoc = parser.parseFromString(xmlString);

  // Extract the CDATA from the XML. This is a hacky way to do it, but it works. We can rebuild the CDATA but the XML parser doesn't like the broken <br> tags.
  const rawCDATA = xmlString.match(/<!\[CDATA\[(.*?)\]\]>/g);

  // Extract the link tags from the XML. This is a hacky way to do it, but it works. The parser doesn't like the <link></link> tags and seems to remove their text content and move them to the parent node.
  const rawLinkTags = xmlString
    .match(/<link>(.*?)<\/link>/g)
    ?.map((tag) => tag.replace('<link>', '').replace('</link>', ''));

  const textLinks = [...(rawLinkTags ?? [])];

  const itunesNewFeedUrl = xmlString
    .match(/<itunes:new-feed-url>(.*?)<\/itunes:new-feed-url>/g)
    ?.map((tag) => tag.replace('<itunes:new-feed-url>', '').replace('</itunes:new-feed-url>', ''));

  /**
   * Converts a node to a node for the json object
   * @param rawNode - The node to convert.
   * @returns The converted node.
   */
  function xmlToJson(rawNode: Node): any {
    const data: any = {};

    const node = cleanNode(rawNode);

    // TODO: Investigate parsing the link tags properly.
    if (node.jsonName === 'link') {
      const text = rawLinkTags?.shift();
      if (Object.keys(data).length === 0) return text;
    }

    const attributes = node.attributes as unknown as Array<{ name: string; value: string }>;
    if (attributes && attributes.length > 0) {
      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];

        data[`@${attribute.name}`] = attribute.value;
      }
    }

    if (
      !node.childNodes ||
      node.childNodes.length === 0 ||
      (node.childNodes.length === 1 && node.childNodes[0].textContent)
    ) {
      let text: string | undefined = node.textContent.trim();

      if (text === '') text = undefined;
      else if (textLinks.includes(text)) text = undefined;

      if (Object.keys(data).length === 0) return text;
      if (text === undefined) return data;

      data['#text'] = text;
      return data;
    }

    if (node.childNodes[0].textContent.trim() === '<![CDATA[') {
      //TODO: Investigate fixing this. It breaks as <br> tags are not closed. and the parser doesn't like it.
      /* node.childNodes.splice(0, 1);
      node.childNodes.splice(node.childNodes.length - 1, 1);
      const cdataJson = xmlToJson(node);
      const cdataXML = generateXMLFromObject(cdataJson, { excludeXMLHeader: true, pretty: false }); */
      data['#cdata'] = rawCDATA?.shift()?.replace('<![CDATA[', '').replace(']]>', '');
      return data;
    }

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = cleanNode(node.childNodes[i]);

      const jsonNode = xmlToJson(child);
      if (jsonNode === undefined) continue;
      else if (jsonNode.jsonName === '#text' && textLinks.includes(jsonNode)) continue;
      //TODO: Remove this once we fix the hyphen tag name issue.
      else if (
        node.jsonName === 'channel' &&
        typeof jsonNode === 'string' &&
        jsonNode.includes('new-feed-url')
      ) {
        if (itunesNewFeedUrl !== undefined && itunesNewFeedUrl.length > 0) {
          data['itunes:new-feed-url'] = itunesNewFeedUrl[0];
        }
        continue;
      }
      if (data[child.jsonName] === undefined) {
        data[child.jsonName] = jsonNode;
      } else {
        if (!Array.isArray(data[child.jsonName])) {
          data[child.jsonName] = [data[child.jsonName]];
        }
        data[child.jsonName].push(jsonNode);
      }
    }

    return data;
  }

  const node = xmlDoc.getElementsByTagName('channel');
  if (!node) throw new Error('No channel node found');
  return xmlToJson(node[0]);
}
