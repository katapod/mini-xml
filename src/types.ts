export type XMLObject = {
  [key: string]: XMLValueType | undefined;
};

export type XMLAttributes = {
  [key: string]: string;
};

export type SupportedDataTypes = string | number | boolean | Date;

export type XMLValueType = SupportedDataTypes | Array<SupportedDataTypes> | XMLObject | XMLObject[];

export interface GenerateXMLOptions {
  /** Whether to apply formatting */
  pretty?: boolean;
  /** The number of spaces to indent each level */
  indentSpaces?: number;
  /** Whether to exclude the XML header */
  excludeXMLHeader?: boolean;
  /** Whether to exclude the XML version */
  excludeXMLVersion?: boolean;
  /** Whether to exclude the XML encoding */
  excludeXMLEncoding?: boolean;
  /** A function to format dates to a string */
  formatDateFunction?: (date: Date) => string;
}

export interface TagOptions {
  /** The tag indentation depth */
  depth: number;
  /** Whether to apply formatting */
  pretty: boolean;
  /** The number of spaces to indent by */
  indent: number;
}
