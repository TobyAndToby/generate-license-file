import os from "os";

export const lineEndings = ["crlf", "lf"] as const;

/**
 * Used to specify which line endings to use in the generated file.
 *
 * Possible values are:
 *
 * `crlf` (`\r\n`)
 *
 * `lf` (`\n`)
 */
export type LineEnding = (typeof lineEndings)[number];

const lineEndingsMap = {
  crlf: "\r\n",
  lf: "\n",
} as const satisfies Record<LineEnding, string>;

export type LineEndingCharacters = (typeof lineEndingsMap)[LineEnding];
export const lineEndingCharacters = Object.values(lineEndingsMap);

export const isLineEnding = (input: unknown): input is LineEnding =>
  lineEndings.includes(input as LineEnding);

export const getLineEndingCharacters = (input: LineEnding | undefined): LineEndingCharacters => {
  if (input === undefined) {
    return os.EOL as LineEndingCharacters;
  }

  return lineEndingsMap[input];
};
