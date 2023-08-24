import { cdataTag, tag, tagXmlHeader } from './tags';
import type {
  XMLObject,
  GenerateXMLOptions,
  XMLAttributes,
  TagOptions,
  XMLValueType,
} from './types';
import { handleStringify, replaceInvalidXmlElementBodyCharacters } from './utility';

/**
 * Generate XML from an object
 * @param object - the object to convert to XML
 * @param options - the tag options
 * @returns the XML string
 */
export function generateXMLFromObject(object: XMLObject, options?: GenerateXMLOptions): string {
  const attributes = getAttributes(object);

  if (!attributes.version && !options?.excludeXMLVersion) attributes.version = '1.0';
  if (!attributes.encoding && !options?.excludeXMLEncoding) attributes.encoding = 'UTF-8';

  // Move version and encoding to the front of the attributes
  if (attributes.version) {
    const version = attributes.version;
    delete attributes.version;
    attributes.version = version;
  }

  if (attributes.encoding) {
    const encoding = attributes.encoding;
    delete attributes.encoding;
    attributes.encoding = encoding;
  }

  const rootElements = getElements(object, {
    prefix: ['@', '?'],
    antiPattern: true,
  });

  const headerElements = getElements(object, {
    prefix: '?',
  });

  const xmlHeader = options?.excludeXMLHeader ? '' : headerElements['?xml'];

  headerElements['?xml'] = undefined;

  let headerString = options?.excludeXMLHeader
    ? ''
    : tagXmlHeader({
        name: '?xml',
        attributes: xmlHeader ? getAttributes(xmlHeader as XMLObject) : attributes,
      });
  Object.keys(headerElements).forEach((key) => {
    if (headerElements[key]) {
      // Default is true, so it should be pretty unless explicitly set to false
      if (options?.pretty !== false) headerString += '\n';
      const attributes = getAttributes(headerElements[key] as XMLObject);
      headerString += tagXmlHeader({
        name: key,
        attributes,
      });
    }
  });

  return `${headerString}${generateXML(rootElements, {
    depth: 0,
    pretty: options?.pretty ?? true,
    indent: options?.indentSpaces ?? 2,
    formatDateFunction: options?.formatDateFunction ?? ((date): string => date.toUTCString()),
  })}`.trimEnd();
}

/**
 * Get the XML attributes of an object
 * @param object - the object to get the attributes from
 * @returns the XML attributes
 */
export function getAttributes(object: XMLObject): XMLAttributes {
  return getElements(object, {
    prefix: '@',
    removePrefix: true,
    stringifyValues: true,
  }) as XMLAttributes;
}

/**
 * Get the XML elements of an object
 * @param object - the object to get the elements from
 * @param options - the search and return options
 * @returns the XML elements
 */
export function getElements(
  object: XMLObject,
  options?: {
    prefix: string | string[];
    stringifyValues?: boolean;
    formatDateFunction?: (date: Date) => string;
  } & (
    | {
        antiPattern?: boolean;
        removePrefix?: never | false;
      }
    | {
        antiPattern?: never | false;
        removePrefix?: boolean;
      }
  )
): XMLObject | XMLAttributes {
  const prefix = options && 'prefix' in options && options.prefix;
  if (!prefix) return object;

  const stringifyValues = options && 'stringifyValues' in options && options.stringifyValues;
  const antiPattern = options && 'antiPattern' in options && options.antiPattern;
  const removePrefix = options && 'removePrefix' in options && options.removePrefix;
  const keys = Object.keys(object);

  const filteredKeys = keys.filter((key) => {
    if (Array.isArray(prefix)) {
      return antiPattern
        ? !prefix.some((p) => key.startsWith(p))
        : prefix.some((p) => key.startsWith(p));
    } else {
      return antiPattern ? !key.startsWith(prefix) : key.startsWith(prefix);
    }
  });
  return filteredKeys.reduce(
    (acc, key) => ({
      ...acc,
      [prefix && removePrefix ? key.slice(prefix.length) : key]: stringifyValues
        ? handleStringify(object[key], options.formatDateFunction)
        : object[key],
    }),
    {}
  );
}

/**
 * Recursively build an XML string from an object
 * @param object - the object to convert to XML
 * @param options - the tag options
 * @returns the XML string
 */
function generateXML(
  object: XMLObject,
  options: TagOptions & {
    formatDateFunction: (date: Date) => string;
  }
): string {
  const { formatDateFunction } = options;

  const keys = Object.keys(object);

  let xml = options.pretty ? '\n' : '';

  /**
   * Build an XML node from a key and value
   * @param key - the key of the primary tag
   * @param value - the value of primary tag
   * @returns the XML node
   */
  function getNode({ key, value }: { key: string; value?: XMLValueType }): string {
    if (value == undefined || value === null) return tag({ name: key, options });

    if (typeof value === 'string') {
      if (key === '#text') return replaceInvalidXmlElementBodyCharacters(value);
      if (key === '#cdata') return cdataTag({ value, options });
      return tag({ name: key, value: replaceInvalidXmlElementBodyCharacters(value), options });
    }
    if (typeof value === 'number' || typeof value === 'boolean' || value instanceof Date)
      return tag({
        name: key,
        value: replaceInvalidXmlElementBodyCharacters(handleStringify(value, formatDateFunction)),
        options,
      });

    if (Array.isArray(value)) return value.map((item) => getNode({ key, value: item })).join('');

    // Return a tag with attributes if the value is an object
    if (typeof value === 'object') {
      const attributes = getAttributes(value);
      const children = getElements(value, { prefix: '@', antiPattern: true });

      return tag({
        name: key,
        attributes,
        value: generateXML(children, {
          ...options,
          depth: options.depth + 1,
        }),
        options,
      });
    }

    throw new Error(`Invalid value type: ${typeof value}`);
  }

  if (!keys || keys.length === 0) return '';

  // If the object only has one key and it is '#text', remove the newline character from the XML
  if (keys.length === 1 && keys[0] === '#text') xml = '';

  keys.forEach((key) => (xml += getNode({ key, value: object[key] })));

  return xml;
}
