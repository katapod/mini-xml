import type { TagOptions, XMLAttributes } from './types';
import { replaceInvalidXmlAttributeCharacters, replaceInvalidXmlCdataCharacters } from './utility';

/**
 * Build an XML tag
 * @param name - the name of the tag (<name/>)
 * @param value - the tag content (optional) (<name>content</name>)
 * @param attributes - the tag attributes (optional) (<name att1="att1value"/> or <name att1="att1value">content</name>)
 * @param options - the tag options
 * @returns the XML tag
 */
export const tag = ({
  name,
  value,
  attributes,
  options,
}: {
  name: string;
  value?: string;
  attributes?: XMLAttributes;
  options: TagOptions;
}): string =>
  value
    ? tagWithContent({ name, value, attributes, options })
    : tagSelfClosing({ name, attributes, options });

/**
 * Build a tag with content
 * @param name - the name of the tag (<name>content</name>)
 * @param value - the tag content
 * @param attributes - the tag attributes (optional) (<name att1="att1value">content</name>)
 * @param options - the tag options
 * @returns the tag with content
 */
export const tagWithContent = ({
  name,
  value,
  attributes,
  options: { depth, pretty, indent },
}: {
  name: string;
  value: string;
  attributes?: XMLAttributes;
  options: TagOptions;
}): string => {
  if (pretty) {
    if (value.includes('\n') && !value.startsWith('\n')) value = '\n' + value;
    if (value.includes('\n') && !value.endsWith('\n')) value += '\n';
  }
  if (value.endsWith('\n')) value += ''.padStart(depth * indent);
  return (
    ''.padStart(pretty ? depth * indent : 0) +
    `<${name}${tagAttributes(attributes)}>${value}</${name}>${pretty ? '\n' : ''}`
  );
};

/**
 * Build a self closing XML tag
 * @param name - the name of the tag (<name/>)
 * @param attributes - the tag attributes (optional) (<name att1="att1value"/>)
 * @param options - the tag options
 * @returns the self closing tag
 */
export const tagSelfClosing = ({
  name,
  attributes,
  options: { depth, pretty, indent },
}: {
  name: string;
  attributes?: XMLAttributes;
  options: TagOptions;
}): string =>
  ''.padStart(pretty ? depth * indent : 0) +
  `<${name}${tagAttributes(attributes)}/>${pretty ? '\n' : ''}`;

/**
 * Build the tag attributes in valid XML format
 * @param attributes - the attributes
 * @returns the tag attributes as a string
 */
export const tagAttributes = (attributes?: XMLAttributes): string =>
  attributes && Object.keys(attributes).length > 0
    ? ' ' +
      Object.entries(attributes)
        .map(([key, value]) => `${key}="${replaceInvalidXmlAttributeCharacters(value)}"`)
        .join(' ')
    : '';

/**
 * Build a CDATA tag
 * @param value - the content of the CDATA tag
 * @returns the CDATA tag
 */
export const cdataTag = ({
  value,
  options: { depth, pretty, indent },
}: {
  value: string;
  options: TagOptions;
}): string =>
  ''.padStart(pretty ? depth * indent : 0) +
  `<![CDATA[${replaceInvalidXmlCdataCharacters(value)}]]>${pretty ? '\n' : ''}`;

/**
 * Build an XML header tag
 * @param name - the name of the tag
 * @param attributes - the tag attributes (optional) (<name att1="att1value"/>)
 * @param options - the tag options
 * @returns the header tag
 */
export const tagXmlHeader = ({
  name,
  attributes,
}: {
  name: string;
  attributes?: XMLAttributes;
}): string => `<${name.startsWith('?') ? name : `?${name}`}${tagAttributes(attributes)}?>`;
