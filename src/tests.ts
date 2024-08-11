import { xml2json } from 'xml-js';

export const isValidXml = (xml: string) => {
  try {
    const res = xml2json(xml);

    return !!(res && res.length > 0);
  } catch (error) {
    return false;
  }
};
