import { LineEndingCharacters } from "../lineEndings";

const lineEndingRegex = /\r\n|\r|\n/g;

export const prepareContentForOutput = (content: string, eol: LineEndingCharacters): string => {
  return content.replace(lineEndingRegex, eol).trim();
};
